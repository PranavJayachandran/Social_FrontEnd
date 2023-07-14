import React, { useState } from "react";
import Navbar from "./Navbar";
import UserData from "./UserData";
import { TiThMenu } from "react-icons/ti";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Drawer from "./Drawer/drawer";

const EditProfile = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [drawer, showDrawer] = useState(-300);

  return (
    <div className="w-full bg-red-400 flex">
      <div className="border-l h-[740px] sm:h-[400px] border-[#8d8e92] w-full bg-[#17181c]">
        <div className="text-lg py-4 px-10 text-white bg-[#1e1f23] flex w-full justify-between">
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
          )}{" "}
          Edit Profile
        </div>
        {isTabletOrMobile ? (
          <motion.div className="text-white absolute" animate={{ x: drawer }}>
            <Drawer />
          </motion.div>
        ) : (
          <></>
        )}
        <UserData />
      </div>
    </div>
  );
};

export default EditProfile;
