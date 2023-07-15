import React, { useState, useContext, useEffect } from "react";
import NavBar from "../Navbar";
import { FaUserFriends } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Drawer from "../Drawer/drawer";
import { UserDataContext } from "../../context";
import friend from "../../interfaces/friends";
import Friend from "./Friend";
import { getImageSigned } from "../../utils/basicsetup";

const Friends = () => {
  const location = useLocation();
  const [drawer, showDrawer] = useState(-300);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [friends, setFriends] = useState<Array<friend>>([]);
  const [recommendations, setRecommendations] = useState<Array<friend>>([]);
  const { user_data, setUserData } = useContext(UserDataContext);
  const setupFriends = (users: Array<friend>) => {
    if (friends.length > 0) return;
    if (recommendations.length > 0) return;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: "5f16163c-1463-450a-b0a5-6d55fb4ba76e",
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/getfriends`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        users.map(async (item: friend) => {
          if (item.id == user_data.id) return;
          let friend = item;
          friend.user_image = await getImageSigned(
            item.user_image,
            "UserImages",
            600
          );
          const found = result.some((el: any) => {
            if (el.friend1 == item.id || el.friend2 == item.id) return true;
          });

          if (!found) setFriends((prevState) => [...prevState, friend]);
          else setRecommendations((prevState) => [...prevState, friend]);
        });
      })
      .catch((error) => console.log("error", error));
  };
  const getFriends = () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => setupFriends(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (user_data.id && friends.length == 0) {
      getFriends();
    }
  }, [user_data]);

  useEffect(() => {
    console.log("FRiends", friends, "REC", recommendations);
  }, [friends, recommendations]);

  return (
    <div>
      <div className="border-l h-full border-[#8d8e92] flex-col flex justify-center  w-full bg-[#17181c]">
        <NavBar
          showDrawer={showDrawer}
          drawer={drawer}
          icon={<FaUserFriends className="sm:h-6 sm:w-6 h-4 w-4" />}
          name="Friends"
        />
        {isTabletOrMobile ? (
          <motion.div className="text-white absolute" animate={{ x: drawer }}>
            <Drawer />
          </motion.div>
        ) : (
          <></>
        )}
        {(() => {
          switch (location.pathname) {
            case "/app/friends":
              return (
                <div
                  className={`${
                    isTabletOrMobile ? "h-[684px]" : "h-[497px]"
                  } hide_scroll overflow-scroll`}
                >
                  <div className="text-[12px] sm:text-sm flex gap-2 sm:gap-4 items-center">
                    <div className="mt-4 w-full gap-2 flex justify-center items-center">
                      <Link to="/app/friends">
                        <div className="bg-[#72728c] text-center  text-white rounded-lg p-2">
                          Friends
                        </div>
                      </Link>
                      <Link to="/app/recommendations">
                        <div className="text-white">Recommendations</div>
                      </Link>
                    </div>
                  </div>
                  <div className="py-10  w-full gap-4 justify-center flex flex-wrap  ">
                    {friends ? (
                      recommendations.map((item) => (
                        <Friend
                          friend={item}
                          isFriend={false}
                          setFriends={setFriends}
                          setRecommendations={setRecommendations}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            case "/app/recommendations":
              return (
                <div
                  className={`${
                    isTabletOrMobile ? "h-[684px]" : "h-[497px]"
                  } hide_scroll overflow-scroll`}
                >
                  <div className="text-[12px] sm:text-sm flex gap-2 sm:gap-4 items-center">
                    <div className="mt-4 w-full gap-2 flex justify-center items-center">
                      <Link to="/app/friends">
                        <div className="text-white">Friends</div>
                      </Link>
                      <Link to="/app/recommendations">
                        <div className="bg-[#72728c] text-white rounded-lg p-2">
                          Recommendations
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="py-10 gap-4 justify-center  flex flex-wrap  ">
                    {friends ? (
                      friends.map((item) => (
                        <Friend
                          friend={item}
                          isFriend={true}
                          setFriends={setFriends}
                          setRecommendations={setRecommendations}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default Friends;
