import React, { useState, useContext, useEffect } from "react";
import event from "../../interfaces/event";
import { UserDataContext } from "../../context";

interface Props {
  item: event;
}
const Event = ({ item }: Props) => {
  const [callToAction, setCallToAction] = useState("Join");
  const { user_data, setUserData } = useContext(UserDataContext);

  const formatedDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  const joinEvent = (event_id: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user_data.id,
      event_id: event_id,
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
        event_to_user: [...prevState.event_to_user, { event_id: event_id }],
      }));
  };

  const leaveEvent = (event_id: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user_data.id,
      event_id: event_id,
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
          (event: any) => event.event_id !== event_id
        );
        return { ...prevState, event_to_user: updatedName };
      });
    }
  };

  const isUserAttendingEvnet = () => {
    let joined = 0;
    if (user_data != undefined && user_data.event_to_user != undefined) {
      user_data.event_to_user.map((event: any) => {
        if (event.event_id === item.id) joined = 1;
      });
      if (joined == 1) setCallToAction("Leave");
      else setCallToAction("Join");
    }
  };
  useEffect(() => {
    isUserAttendingEvnet();
  }, [user_data]);
  return (
    <div className="flex sm:justify-start justify-center items-center gap-2">
      <div className="sm:text-base text-sm">{item.name}</div>
      <div className="text-xs sm:text-sm">on {formatedDate(item.date)}</div>
      <div className="flex justify-center items-center">
        {callToAction == "Join" ? (
          <div
            className="sm:mt-2 bg-green-600 w-14 text-center py-1 rounded-lg text-white text-xs sm:text-sm hover:bg-white hover:text-green-400 transition cursor-pointer"
            onClick={() => joinEvent(item.id)}
          >
            {callToAction}
          </div>
        ) : (
          <></>
        )}
        {callToAction == "Leave" ? (
          <div
            className="hover:bg-white hover:text-red-400 transition cursor-pointer sm:mt-2 bg-red-500 w-14 text-center py-1 rounded-lg text-white text-xs sm:text-sm"
            onClick={() => leaveEvent(item.id)}
          >
            {callToAction}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Event;
