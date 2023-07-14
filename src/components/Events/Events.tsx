import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CreateEvent from "./CreateEvent";
import Event from "./Event";
import event from "../../interfaces/event";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Drawer from "../Drawer/drawer";

const Events = () => {
  const [events, setEvents] = useState<Array<event>>();
  const [drawer, showDrawer] = useState(-300);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const getEvents = async () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/events`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("EVEMT", result);
        setEvents(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <NavBar showDrawer={showDrawer} drawer={drawer} />
      {isTabletOrMobile ? (
        <motion.div className="text-white absolute" animate={{ x: drawer }}>
          <Drawer />
        </motion.div>
      ) : (
        <></>
      )}
      <div className="px-10 hide_scroll overflow-scroll h-[685px] sm:h-[491px]">
        <div className="mt-6 flex flex-col gap-4 justify-center text-[#8d8e92] items-center">
          {events?.map((item: any) => (
            <Event item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
