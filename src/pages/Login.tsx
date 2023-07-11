import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const Login = () => {
  const { pathname } = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authenticate = async () => {
    if (pathname == "/signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
      } else {
        console.log("Logged in user:", data);
      }
    }
    if (pathname == "/login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
      } else {
        console.log("Logged in user:", data);
      }
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="flex w-full">
        <div className="flex bg-red-100 flex-1">One</div>
        <div className="text-white flex flex-col justify-center items-center  bg-[#17181c] h-screen flex-1">
          <div className="flex flex-col gap-8">
            <div className="text-3xl text-center ">Company Name</div>
            <div className="flex flex-col gap-2 mt-6">
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
              <div className="text-xs text-right text-slate-300">
                Forgot Password?
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-teal-600 px-14 rounded-xl text-slate-300 py-2 cursor-pointer hover:bg-teal-400 hover:text-white transition"
                onClick={authenticate}
              >
                {pathname == "/login" ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
