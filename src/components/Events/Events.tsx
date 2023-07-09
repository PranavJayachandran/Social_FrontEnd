import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CreateEvent from "./CreateEvent";
import Event from "./Event";
import event from "../../interfaces/event";

const Events = () => {
  const [events, setEvents] = useState<Array<event>>();

  const getEvents = async () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://cjkrw6-5000.csb.app/events", requestOptions)
      .then((response) => response.json())
      .then((result) => setEvents(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getEvents();
  });
  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <NavBar />
      <div className="px-10 hide_scroll overflow-scroll h-[491px]">
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
