import React, { useContext } from "react";
import { AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context";
import { useMediaQuery } from "react-responsive";
import { TiThMenu } from "react-icons/ti";

interface Props {
  showDrawer?: (newUserDetails: any) => void;
  drawer: number;
}
const NavBar = ({ showDrawer, drawer }: Props) => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className=" py-4 px-4 sm:px-10 text-white bg-[#1e1f23] flex w-full justify-between">
      {isTabletOrMobile ? (
        <div className="flex justify-center items-center">
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
        <BsFillCalendarEventFill className="sm:h-6 sm:w-6 h-4 w-4 " />
        <div className=" sm:text-lg">Events</div>
      </div>
      <div className="flex sm:gap-4 gap-2 justify-center items-center">
        <AiFillMessage className="sm:h-6 sm:w-6 h-4 w-4 " />
        <MdNotifications className="sm:h-6 sm:w-6 h-4 w-4 " />
        <div className="flex gap-4 justify-center items-center">
          <div className="text-sm sm:text-base  ">{user_data.name}</div>
          <Link to="/app/editprofile">
            <div className="sm:h-10 sm:w-10 h-6 w-6 rounded-full flex justify-center items-center bg-blue-100 overflow-hidden">
              <img className="h-full w-full" src={user_data.user_image_link} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
