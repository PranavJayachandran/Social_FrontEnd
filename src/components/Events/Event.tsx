import React from "react";
import NavBar from "./NavBar";
import CreateEvent from "./CreateEvent";
import event from "../../interfaces/event";

interface Props {
  item: event;
}
const Event = ({ item }: Props) => {
  return (
    <div className="p-2 rounded-xl bg-[#1e1f23]">
      <div className=" h-40 w-52 overflow-hidden">
        <img src={item.cover_image} />
      </div>
      <div>
        <div className="text-white text-lg">{item.name}</div>
        <div className="-mt-1 text-xs">Conducted by: {item.community}</div>
      </div>
      <div className="mt-4 flex justify-center ">
        <div className="bg-red-500 text-white rounded-xl px-4 py-2 transition hover:bg-white hover:text-red-500 cursor-pointer">
          Leave
        </div>
      </div>
    </div>
  );
};

export default Event;
