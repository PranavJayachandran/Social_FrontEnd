import React, { useEffect, useState, useContext } from "react";
import option from "../../interfaces/drawer_option";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillPeopleFill, BsCalendar3Event } from "react-icons/bs";
import Drawer_options from "./Drawer_options";
import community from "../../interfaces/community";
import Community_Drawer from "./Community_Drawer";
import event from "../../interfaces/event";
import UpComingEvents from "../UpComingEvents";
import { getUserData } from "../../utils/basicsetup";
import { UserDataContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useMediaQuery } from "react-responsive";
import { FaUserFriends } from "react-icons/fa";

const AiFillHomeComponent: React.FC = () => <AiFillHome />;
const BsFillPeopleFillComponent: React.FC = () => <BsFillPeopleFill />;
const BsCalendar3EventComponent: React.FC = () => <BsCalendar3Event />;
const FaUserFriendsComponent: React.FC = () => <FaUserFriends />;
var options: Array<option> = [
  {
    name: "Home",
    icon: AiFillHomeComponent,
    link: "home",
  },
  {
    name: "Community",
    icon: BsFillPeopleFillComponent,
    link: "communityjoined",
  },
  {
    name: "Events",
    icon: BsCalendar3EventComponent,
    link: "events",
  },
  {
    name: "Following",
    icon: FaUserFriendsComponent,
    link: "friends",
  },
];

// var communitys: Array<community> = [
//   {
//     name: "Community One",
//     members: 123,
//     image: Image1,
//   },
//   {
//     name: "Community Two",
//     members: 123,
//     image: Image2,
//   },
//   {
//     name: "Community Three",
//     members: 123,
//     image: Image3,
//   },
// ];

const Drawer = () => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();
  const logout = async () => {
    const supabase = createClient(
      process.env.REACT_APP_SUPABASEURL!,
      process.env.REACT_APP_SUPABASEKEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("user_id");
    navigate("/auth/login");
  };

  useEffect(() => {
    console.log(user_data);
  }, [user_data]);

  return (
    <div
      className={` hide_scroll overflow-scroll ${
        isTabletOrMobile ? "h-[680px] w-full" : "h-screen w-3/12 "
      } `}
    >
      <div className=" bg-[#1e1f23] px-6 pb-20 text-[#8d8e92]  flex flex-col justify-center gap-6">
        <div className="flex mt-12 gap-4 pl-3 items-center">
          <div className="h-14 w-14 overflow-hidden bg-blue-100 rounded-full">
            <img src="https://th.bing.com/th/id/OIP.OuOqWTlHAOy-vd3Db_Ek6wHaHa?w=150&h=150&c=7&r=0&o=5&dpr=1.5&pid=1.7" />
          </div>
          <div className="text-xl">CommunityLink</div>
        </div>
        {/* <div className="text-sm px-4 gap-2 mx-6 py-3 bg-[#26272e] border border-[#8d8e92] flex rounded-lg justify-center items-center">
          <AiOutlineSearch className="h-4 w-4 mt-1" />
          <input
            className="w-full bg-inherit"
            placeholder="Explore the CompanyName"
          />
        </div> */}
        <div className=" flex flex-col pb-8 border-[#8d8e92] border-b">
          {options.map((item, index) => (
            <Drawer_options item={item} key={index} state={user_data} />
          ))}
        </div>
        <div className="pb-8 border-[#8d8e92] border-b">
          <div className="text-[#cacbcf] text-lg mb-2">My community</div>
          <div className="flex flex-col">
            {user_data != undefined &&
            user_data.community_to_user !== undefined ? (
              user_data.community_to_user.map(
                (item: any, index: any) =>
                  index < 3 && <Community_Drawer item={item.community} />
              )
            ) : (
              <div>Join more communities to interact</div>
            )}
          </div>
          {user_data != undefined &&
          user_data.community_to_user !== undefined ? (
            user_data.community_to_user.length > 3 ? (
              <div className="mt-2 flex justify-center">
                <Link to="/app/communityjoined">
                  <div className="bg-green-700 py-1 px-4 text-white rounded-xl hover:bg-white hover:text-green-500 transition">
                    More
                  </div>
                </Link>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className="text-[#cacbcf] text-lg mb-2">UpComing Events</div>
          <div className="flex flex-col">
            {user_data != undefined && user_data.event_to_user !== undefined ? (
              user_data.event_to_user.map(
                (item: any, index: any) =>
                  index < 3 && <UpComingEvents item={item} />
              )
            ) : (
              <div>Why miss out on events</div>
            )}
          </div>
          {user_data != undefined && user_data.event_to_user !== undefined ? (
            user_data.event_to_user.length > 3 ? (
              <div className="mt-2 flex justify-center">
                <Link to="/app/events">
                  <div className="bg-green-700 py-1 px-4 text-white rounded-xl hover:bg-white hover:text-green-500 transition">
                    More
                  </div>
                </Link>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div
          className="bg-red-800 rounded-xl text-center text-slate-300 py-2 transition hover:text-red-800 hover:bg-slate-300 cursor-pointer"
          onClick={logout}
        >
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
