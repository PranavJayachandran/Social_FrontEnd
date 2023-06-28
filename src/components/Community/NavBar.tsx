import React from "react";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { Link } from "react-router-dom";
import community from "../../interfaces/community";

const NavBar = () => {
  return (
    <div className=" py-4 px-10 text-white bg-[#1e1f23] flex w-full justify-between">
      <div className="flex justify-center items-center gap-2">
        <CgCommunity className="h-6 w-6" />
        <div className="text-lg">Community</div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <AiFillMessage className="h-6 w-6" />
        <MdNotifications className="h-6 w-6" />
        <div className="flex gap-4 justify-center items-center">
          <div>Pranj</div>
          <Link to="/editprofile">
            <div className="h-10 w-10 rounded-full bg-blue-100"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;