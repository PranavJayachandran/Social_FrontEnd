import React, { useState } from "react";
import Navbar from "./Navbar";
import Trending_Friends from "./Trending_Friends";
import Posts from "./Post/Posts";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Drawer from "./Drawer/drawer";

const Main = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [drawer, showDrawer] = useState(-300);

  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <Navbar showDrawer={showDrawer} drawer={drawer} />
      {isTabletOrMobile ? (
        <motion.div className="text-white absolute" animate={{ x: drawer }}>
          <Drawer />
        </motion.div>
      ) : (
        <></>
      )}
      <div
        className={`hide_scroll overflow-scroll w-full flex  ${
          isTabletOrMobile ? "h-[685px]" : "h-[491px]"
        }`}
      >
        <Posts />
        {!isTabletOrMobile ? <Trending_Friends /> : <></>}
      </div>
    </div>
  );
};
export default Main;
