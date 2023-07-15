import React, { useContext, useEffect, useState } from "react";
import trending from "../interfaces/trending";
import { UserDataContext } from "../context";
import friend from "../interfaces/friends";
import { getImageSigned } from "../utils/basicsetup";
import { Link } from "react-router-dom";

// interface friend {
//   username: string;
//   last_active_time: Date;
// }
// var today_trending: Array<trending> = [
//   {
//     name: "Figma maintenance",
//     number: 125,
//     freq: 66,
//   },
//   {
//     name: "Blender Update",
//     number: 117,
//     freq: 45,
//   },
//   {
//     name: "Stackoverflow server",
//     number: 57,
//     freq: 42,
//   },
// ];

// var my_friends: Array<friend> = [
//   {
//     username: "User1",
//     last_active_time: new Date(382422132132103),
//   },
//   {
//     username: "User2",
//     last_active_time: new Date(382422132132103),
//   },
//   {
//     username: "User3",
//     last_active_time: new Date(382422132132103),
//   },
// ];

const Trending_Friends = () => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const [friends, setFriends] = useState<Array<friend>>([]);

  const setupFriends = (users: Array<friend>) => {
    if (friends.length > 0) return;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user_data.id,
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
            if (el.friend2 == item.id) return true;
          });

          if (found) setFriends((prevState) => [...prevState, friend]);
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
  return (
    <div className="mr-8 text-[#8d8e92] bg-[#17181c] flex items-center flex-col w-1/3">
      {/* <div className="mt-10 flex flex-col w-72 px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
        <div>Today Trending</div>
        <div className="flex flex-col gap-3 mt-4">
          {today_trending.map((item) => (
            <div className="flex items-center justify-between">
              <div className="text-xs">
                <div className="text-white font-semibold text-sm">
                  {item.name}
                </div>
                <div>{item.number} posts today</div>
              </div>
              <div className="text-xs bg-[#343440] px-1 rounded-lg py-1">
                {item.freq} in 1 hour
              </div>
            </div>
          ))}
          <div className="text-center text-sm text-[#3383f4]">See all</div>
        </div>
      </div> */}
      <div className="mt-10 flex flex-col w-72 px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
        <div>Following</div>
        <div className="flex flex-col gap-3 mt-4">
          {friends.map((friend) => (
            <div className="flex items-center gap-2 text-sm">
              <div className="h-6 w-6 flex justify-center items-center overflow-hidden rounded-full bg-teal-100">
                {friend.user_image != "" ? (
                  <img src={friend.user_image} className="h-6 w-6" />
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div>{friend.name}</div>
                {/* <div className="text-xs">Last active recently</div> */}
              </div>
            </div>
          ))}
        </div>
        <Link to="/app/friends">
          <div className="mt-2 text-center text-sm text-[#3383f4]">See all</div>
        </Link>
      </div>
    </div>
  );
};

export default Trending_Friends;
