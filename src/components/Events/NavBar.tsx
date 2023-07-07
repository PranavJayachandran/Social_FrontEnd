import React, { useContext } from "react";
import { AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context";

const NavBar = () => {
  const { user_data, setUserData } = useContext(UserDataContext);
  return (
    <div className=" py-4 px-10 text-white bg-[#1e1f23] flex w-full justify-between">
      <div className="flex justify-center items-center gap-2">
        <BsFillCalendarEventFill className="h-6 w-6" />
        <div className="text-lg">Event</div>
      </div>
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
