import React, { useContext } from "react";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import community from "../../interfaces/community";
import { UserDataContext } from "../../context";

const NavBar = () => {
  const location = useLocation();
  const { user_data, setUserData } = useContext(UserDataContext);
  return (
    <div className=" py-4 px-10 text-white bg-[#1e1f23] flex w-full justify-between">
      <div className="flex justify-center items-center gap-2">
        <CgCommunity className="h-6 w-6" />
        <div className="text-lg">Community</div>
      </div>

      {(() => {
        switch (location.pathname) {
          case "/communityjoined":
            return (
              <div className="text-xs flex gap-4 items-center">
                <Link to="/communityjoined">
                  <div className="bg-[#72728c] text-white rounded-lg p-2">
                    Joined Communities
                  </div>
                </Link>
                <Link to="/communityunjoined">
                  <div>Unjoined Communities</div>
                </Link>
              </div>
            );
          case "/communityunjoined":
            return (
              <div className="text-xs flex gap-4 items-center">
                <Link to="/communityjoined">
                  <div>Joined Communities</div>
                </Link>
                <Link to="/communityunjoined">
                  <div className="bg-[#72728c] text-white rounded-lg p-2">
                    Unjoined Communities
                  </div>
                </Link>
              </div>
            );
          default:
            return null;
        }
      })()}

      <div className="flex gap-4 justify-center items-center">
        <AiFillMessage className="h-6 w-6" />
        <MdNotifications className="h-6 w-6" />
        <div className="flex gap-4 justify-center items-center">
          <div>{user_data.name}</div>
          <Link to="/editprofile">
            <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden">
              <img src={user_data.user_image} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
