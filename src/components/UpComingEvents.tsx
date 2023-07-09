import React, { useEffect, useState } from "react";
import event from "../interfaces/event";
import {
  formatDescription,
  formateDate,
  formateMonth,
} from "../utils/dateformatter";

interface Props {
  item: { event_id: string };
}

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

  return (
    <div className="flex py-2 items-center cursor-pointer transition hover:bg-[#26272e]">
      <div className="bg-[#26272e] px-3 py-1 flex flex-col justify-center items-center  rouned-xl">
        <div className="text-[#cacbcf] font-semibold">
          {formateDate(event?.date)}
        </div>
        <div className="text-xs">
          {event != undefined ? formateMonth(event?.date) : ""}
        </div>
      </div>
      <div className="ml-2">
        <div className="text-[#cacbcf]">{event?.name}</div>
        <div className="text-xs">
          {formatDescription(event?.description, 10)}
        </div>
      </div>
    </div>
  );
};

export default UpComingEvents;
