import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserDataContext } from "../context";
import { getUserData } from "../utils/basicsetup";
import { useMediaQuery } from "react-responsive";

const supabase = createClient(
  process.env.REACT_APP_SUPABASEURL!,
  process.env.REACT_APP_SUPABASEKEY!,
  { auth: { persistSession: false } }
);

const Login = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("demo@gmail.com");
  const [password, setPassword] = useState<string>("demo@123");
  const [errormessage, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { user_data, setUserData } = useContext(UserDataContext);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const authenticate = async () => {
    setError("");
    setIsLoading(true);
    if (pathname == "/auth/signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        {
          console.error("Error logging in:", error.message);
          setError(error.message);
        }
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: data?.user?.email,
          id: data?.user?.id,
        });

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_BACKEND}/createUser`, requestOptions)
          .then((response) => response.text())
          .then(async (result) => {
            while (setUserData == undefined);
            localStorage.setItem("user_id", result);
            setUserData(await getUserData(result));
          })
          .catch((error) => console.log("error", error));

        setMessage("Verification Mail has been set");
      }
    }
    if (pathname == "/auth/login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
        setError(error.message);
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: data.user.email,
          id: data.user.id,
        });

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        localStorage.setItem("user_id", data.user.id);
        if (setUserData) {
          setUserData(await getUserData(data.user.id));
          navigate("/app/home");
        }
      }
    }
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };
  return (
    <div>
      <div className="flex w-full">
        {!isTabletOrMobile ? (
          <div className="flex justify-center image-bg items-center bg-[#17181c] flex-1">
            <div className="flex flex-col justify-center items-center gap-10 glass-bg w-96 text-slate-600 py-20 px-4">
              <div className="text-4xl">CommunityLink</div>
              <div className="text-lg text-center">
                The one stop place to manage communities, find people with
                similar interests and join amazing events
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="text-white flex flex-col justify-center items-center  bg-[#17181c] h-screen flex-1">
          <div className="flex flex-col gap-8">
            <div className="text-3xl text-center ">CommunityLink</div>
            <div className="flex flex-col gap-2 mt-6">
              <div className="text-red-700 text-sm">{errormessage}</div>
              <div className="text-slate-200 text-center">{message}</div>
              <input
                className="bg-black p-4 w-80 text-sm"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="bg-black p-4 w-80 text-sm"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div className="text-xs text-right text-slate-300">
                Forgot Password?
              </div> */}
            </div>
            <div className="flex gap-8 flex-col justify-center">
              <button
                className="bg-teal-600 px-14 rounded-xl text-slate-300 py-2 cursor-pointer hover:bg-teal-400 hover:text-white transition"
                onClick={authenticate}
                disabled={isLoading}
              >
                {pathname == "/auth/login" ? "Login" : "Sign Up"}
              </button>
              {isLoading ? <LoadingSpinner /> : <></>}
            </div>
            <div>
              {pathname == "/auth/login" ? (
                <Link
                  to="/auth/signup"
                  className="flex justify-center -mt-2 text-slate-500 hover:underline transition cursor-pointer"
                >
                  Don't have an account? Sign Up
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex justify-center -mt-2 text-slate-500 hover:underline transition cursor-pointer"
                >
                  Already Have an account? Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
