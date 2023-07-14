import React, { useContext } from "react";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context";
import { TiThMenu } from "react-icons/ti";
import { useMediaQuery } from "react-responsive";

interface Props {
  showDrawer?: (newUserDetails: any) => void;
  drawer: number;
}
const Navbar = ({ showDrawer, drawer }: Props) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { user_data, setUserData } = useContext(UserDataContext);
  return (
    <div className=" py-4 px-4 sm:px-10 text-white bg-[#1e1f23] flex w-full justify-between">
      {isTabletOrMobile ? (
        <div className=" flex justify-center items-center">
          <TiThMenu
            onClick={() => {
              if (showDrawer) showDrawer(drawer == 0 ? -300 : 0);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center items-center gap-2">
        <AiFillHome className="am:h-6 sm:w-6 h-4 w-4 " />
        <div className="text-sm sm:text-lg">Home</div>
      </div>
      {/* <div className="text-sm flex gap-4 px-2 rounded-lg justify-center items-center bg-[#343440]">
        <div className="bg-[#72728c] px-2 rounded-lg py-1">Explore</div>
        <div>Community feed</div>
        <div>Mutual friend</div>
      </div> */}
      <div className="flex gap-2 sm:gap-4 justify-center items-center">
        <AiFillMessage className="h-4 w-4 am:h-6 sm:w-6" />
        <MdNotifications className="h-4 w-4 sm:h-6 sm:w-6" />
        <div className="sm:text-base text-sm">{user_data.name}</div>
        <Link to="/app/editprofile">
          <div className="sm:h-10 sm:w-10 h-6 w-6  rounded-full flex justify-center items-center bg-blue-100 overflow-hidden">
            <img className="h-full w-full" src={user_data.user_image_link} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
