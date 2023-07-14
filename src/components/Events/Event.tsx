import React, { useContext, useState, useEffect } from "react";
import NavBar from "./NavBar";
import CreateEvent from "./CreateEvent";
import {
  formatDescription,
  formateDate,
  formateMonth,
} from "../../utils/dateformatter";
import event from "../../interfaces/event";
import { UserDataContext } from "../../context";

interface Props {
  item: event;
}

const Event = ({ item }: Props) => {
  const [callToAction, setCallToAction] = useState("Join");
  const { user_data, setUserData } = useContext(UserDataContext);
  const isUserAttendingEvnet = () => {
    let joined = 0;
    console.log(user_data, item.id);
    if (user_data != undefined && user_data.event_to_user != undefined) {
      user_data.event_to_user.map((event: any) => {
        if (event.event_id === item.id) joined = 1;
      });
      if (joined == 1) setCallToAction("Leave");
      else setCallToAction("Join");
    }
  };

  const joinEvent = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user_data.id,
      event_id: item.id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/joinevent`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    if (setUserData != undefined)
      setUserData((prevState: any) => ({
        ...prevState,
        event_to_user: [...prevState.event_to_user, { event_id: item.id }],
      }));
  };

  const leaveEvent = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user_data.id,
      event_id: item.id,
    });

    var requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/leaveevent`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    if (setUserData != undefined) {
      setUserData((prevState: any) => {
        const updatedName = prevState.event_to_user.filter(
          (event: any) => event.event_id !== item.id
        );
        return { ...prevState, event_to_user: updatedName };
      });
    }
  };

  useEffect(() => {
    isUserAttendingEvnet();
  }, [user_data]);

  return (
    <div className="border border-[#26272e] w-full rounded-lg px-2 flex py-2 items-center transition hover:bg-[#26272e]">
      <div className="bg-[#26272e] px-3 py-1 flex flex-col justify-center items-center  rouned-xl">
        <div className="text-[#cacbcf] font-semibold">
          {formateDate(item?.date)}
        </div>
        <div className="text-xs">
          {item != undefined ? formateMonth(item?.date) : ""}
        </div>
      </div>
      <div className="ml-2 w-full">
        <div className="items-center pr-4 text-[#cacbcf] flex w-full justify-between ">
          <div className="text-sm sm:text-base">{item?.name}</div>
          {callToAction == "Join" ? (
            <div
              className="mt-2 bg-green-600 w-10 sm:w-14 text-center py-1 rounded-lg text-white text-xs sm:text-sm hover:bg-white hover:text-green-400 transition cursor-pointer"
              onClick={joinEvent}
            >
              {callToAction}
            </div>
          ) : (
            <></>
          )}
          {callToAction == "Leave" ? (
            <div
              className="hover:bg-white hover:text-red-400 transition cursor-pointer mt-2 bg-red-500 w-10 sm:w-14 text-center py-1 rounded-lg text-white text-xs ms:text-sm"
              onClick={leaveEvent}
            >
              {callToAction}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="sm:-mt-2 text-[#cacbcf] text-xs">
          Conducted by {item.community.name}
        </div>
        <div className="mt-2 text-white text-xs">
          {formatDescription(item?.description, 100)}
        </div>
      </div>
    </div>
  );
};

export default Event;
