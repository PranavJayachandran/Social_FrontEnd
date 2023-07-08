import React from "react";
import NavBar from "./NavBar";
import CreateEvent from "./CreateEvent";
import Event from "./Event";
import event from "../../interfaces/event";

const Events = () => {
  var upcomingEvents: Array<event> = [
    {
      name: "Event One",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event Two",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event three",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event One",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event Two",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event three",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event One",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
    {
      name: "Event Two",
      interested: 10001,
      going: 2000,
      date: new Date("2019-01-16"),
      cover_image:
        "https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      id: 1,
      community: "Mine",
      description: "adlkjskldsaldkasdjasdsad",
    },
  ];
  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <NavBar />
      <div className="px-10 hide_scroll overflow-scroll h-[491px]">
        <div className="text-center mt-4  text-2xl text-[#8d8e92]  ">
          Attending
        </div>
        <div className="mt-6 flex flex-wrap gap-10 justify-center text-[#8d8e92] items-center">
          {upcomingEvents.map((item: any) => (
            <Event item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
