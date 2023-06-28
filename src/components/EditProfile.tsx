import React from "react";
import Navbar from "./Navbar";
import UserData from "./UserData";

const EditProfile = () => {
  return (
    <div className="w-full bg-red-400 flex">
      <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
        <div className="text-lg py-4 px-10 text-white bg-[#1e1f23] flex w-full justify-center">
          Edit Profile
        </div>
        <UserData />
      </div>
    </div>
  );
};

export default EditProfile;
