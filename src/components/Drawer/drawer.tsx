import React, { useEffect, useState, useContext } from "react";
import option from "../../interfaces/drawer_option";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillPeopleFill, BsCalendar3Event } from "react-icons/bs";
import Drawer_options from "./Drawer_options";
import community from "../../interfaces/community";
import Community_Drawer from "./Community_Drawer";
import event from "../../interfaces/event";
import UpComingEvents from "../UpComingEvents";
import getUserData from "../../utils/basicsetup";
import { UserDataContext } from "../../context";
import { Link } from "react-router-dom";

const AiFillHomeComponent: React.FC = () => <AiFillHome />;
const BsFillPeopleFillComponent: React.FC = () => <BsFillPeopleFill />;
const BsCalendar3EventComponent: React.FC = () => <BsCalendar3Event />;
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
];
const Image1: React.FC = () => (
  <img
    className="h-10 w-10"
    src="https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
  />
);
const Image2: React.FC = () => (
  <img
    className="h-10 w-10 "
    src="https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
  />
);
const Image3: React.FC = () => (
  <img
    className="h-10 w-10"
    src="https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
  />
);

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

  useEffect(() => {
    console.log("Got hte userData", user_data);
  }, [user_data]);
  return (
    <div className=" h-screen hide_scroll overflow-scroll w-3/12 ">
      <div className=" bg-[#1e1f23] px-6 pb-20 text-[#8d8e92]  flex flex-col justify-center gap-6">
        <div className="flex mt-12 gap-4 pl-3 items-center">
          <div className="h-14 w-14 bg-blue-100 rounded-full"></div>
          <div className="text-xl">Company name</div>
        </div>
        <div className="text-sm px-4 gap-2 mx-6 py-3 bg-[#26272e] border border-[#8d8e92] flex rounded-lg justify-center items-center">
          <AiOutlineSearch className="h-4 w-4 mt-1" />
          <input
            className="w-full bg-inherit"
            placeholder="Explore the CompanyName"
          />
        </div>
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
              <></>
            )}
          </div>
          {user_data != undefined &&
          user_data.community_to_user !== undefined ? (
            user_data.community_to_user.length > 3 ? (
              <div className="mt-2 flex justify-center">
                <Link to="/communityjoined">
                  <div className="bg-teal-600 py-1 px-4 text-white rounded-xl">
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
              user_data.event_to_user.map((item: any) => (
                <UpComingEvents item={item} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;