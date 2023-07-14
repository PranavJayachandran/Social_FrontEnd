import React from "react";
import trending from "../interfaces/trending";

interface friend {
  username: string;
  last_active_time: Date;
}
var today_trending: Array<trending> = [
  {
    name: "Figma maintenance",
    number: 125,
    freq: 66,
  },
  {
    name: "Blender Update",
    number: 117,
    freq: 45,
  },
  {
    name: "Stackoverflow server",
    number: 57,
    freq: 42,
  },
];

var my_friends: Array<friend> = [
  {
    username: "User1",
    last_active_time: new Date(382422132132103),
  },
  {
    username: "User2",
    last_active_time: new Date(382422132132103),
  },
  {
    username: "User3",
    last_active_time: new Date(382422132132103),
  },
];

const Trending_Friends = () => {
  return (
    <div className="mr-8 text-[#8d8e92] bg-[#17181c] flex items-center flex-col w-1/3">
      <div className="mt-10 flex flex-col w-72 px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
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
      </div>
      <div className="mt-10 flex flex-col w-72 px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
        <div>My friends</div>
        <div className="flex flex-col gap-3 mt-4">
          {my_friends.map((item) => (
            <div className="flex items-center gap-2 text-sm">
              <div className="h-6 w-6 rounded-full bg-teal-100"></div>
              <div>
                <div>{item.username}</div>
                <div className="text-xs">Last active recently</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-sm text-[#3383f4]">See all</div>
      </div>
    </div>
  );
};

export default Trending_Friends;
