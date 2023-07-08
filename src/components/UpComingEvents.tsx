import React, { useEffect, useState } from "react";
import event from "../interfaces/event";

interface Props {
  item: { event_id: string };
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
  const [event, setEvent] = useState<event>();

  const getEvent = () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/event/${item.event_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setEvent(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getEvent();
  }, [item]);
  const formateDate = (time: any) => {
    const date = new Date(time);
    const day = date.getDate();
    return day;
  };
  const formateMonth = (time: any) => {
    const date = new Date(time);
    return date.getMonth();
  };
  const formatDescription = (desc: any) => {
    if (desc != undefined) {
      if (desc.length > 10) return desc.substring(0, 10) + "....";
      else return desc;
    }
  };
  return (
    <div className="flex py-2 items-center cursor-pointer transition hover:bg-[#26272e]">
      <div className="bg-[#26272e] px-3 py-1 flex flex-col justify-center items-center  rouned-xl">
        <div className="text-[#cacbcf] font-semibold">
          {formateDate(event?.date)}
        </div>
        <div className="text-xs">
          {event != undefined ? months[formateMonth(event.date)] : ""}
        </div>
      </div>
      <div className="ml-2">
        <div className="text-[#cacbcf]">{event?.name}</div>
        <div className="text-xs">{formatDescription(event?.description)}</div>
      </div>
    </div>
  );
};

export default UpComingEvents;
