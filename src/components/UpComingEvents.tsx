import React from "react";
import event from "../interfaces/event";

interface Props {
  item: event;
}

var months: { [key: number]: string } = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const UpComingEvents = ({ item }: Props) => {
  return (
    <div className="flex py-2 items-center cursor-pointer transition hover:bg-[#26272e]">
      <div className="bg-[#26272e] px-3 py-1 rouned-xl">
        <div className="text-[#cacbcf] font-semibold">
          {item.date.getDate()}
        </div>
        <div className="text-xs"> {months[item.date.getMonth()]}</div>
      </div>
      <div>
        <div className="text-[#cacbcf]">{item.name}</div>
        <div className="text-xs">
          {item.interested} interested - {item.going} going
        </div>
      </div>
    </div>
  );
};

export default UpComingEvents;
