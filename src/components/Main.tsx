import React from "react";
import Navbar from "./Navbar";
import Trending_Friends from "./Trending_Friends";
import Posts from "./Post/Posts";

const Main = () => {
  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <Navbar />
      <div className="hide_scroll overflow-scroll  flex  h-[498px]">
        <Posts />
        <Trending_Friends />
      </div>
    </div>
  );
};
export default Main;
