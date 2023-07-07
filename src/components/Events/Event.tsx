import React from "react";
import NavBar from "./NavBar";
import CreateEvent from "./CreateEvent";

const Event = () => {
  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <NavBar />
      <div className="hide_scroll overflow-scroll  flex  h-[491px]">
        <CreateEvent />
      </div>
    </div>
  );
};

export default Event;
