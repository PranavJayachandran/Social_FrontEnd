import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context";
import { getUserData } from "../utils/basicsetup";

const SignUpEntry = () => {
  const navigate = useNavigate();
  const { user_data, setUserData } = useContext(UserDataContext);
  useEffect(() => {
    const setUp = async () => {
      let id = localStorage.getItem("user_id");
      if (id != undefined && setUserData != undefined) {
        setUserData(await getUserData(id));
        console.log("Done");
        console.log(id);
        navigate("/app/editprofile");
      }
    };
    if (setUserData != undefined) setUp();
  }, [user_data]);
  return (
    <div className="bg-[#17181c] py-10  h-screen text-white sm:text-xl px-10">
      Redirecting....
    </div>
  );
};

export default SignUpEntry;
