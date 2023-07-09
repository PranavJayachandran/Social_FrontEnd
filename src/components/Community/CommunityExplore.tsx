import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import community from "../../interfaces/community";
import { UserDataContext } from "../../context";
import { Link } from "react-router-dom";
import event from "../../interfaces/event";

const CommunityExplore = () => {
  const location = useLocation();
  const { community, mode } = location.state;
  const [community_data, setCommunity_data] = useState<community>(community);
  const { user_data, setUserData } = useContext(UserDataContext);
  const [joined, setJoined] = useState<number>(mode);
  const [events, setEvents] = useState<Array<event>>();

  const joinCommunity = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: 1,
      community_id: community_data.id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/communitytouser`, requestOptions)
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.log("error", error));

    if (setUserData != undefined)
      setUserData((prevState: any) => ({
        ...prevState,
        community_to_user: [
          ...prevState.community_to_user,
          { community_id: community_data.id, community: community_data },
        ],
      }));
    setCommunity_data((prevState) => ({
      ...prevState,
      members: prevState.members + 1,
    }));
    setJoined(1);
  };
  const LeaveCommunity = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: 1,
      community_id: community_data.id,
    });
    var requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/communitytouser`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    if (setUserData != undefined) {
      setUserData((prevState: any) => {
        const updatedName = prevState.community_to_user.filter(
          (item: any) => item.community_id !== community_data.id
        );
        return { ...prevState, community_to_user: updatedName };
      });
    }
    setJoined(0);
    setCommunity_data((prevState) => ({
      ...prevState,
      members: prevState.members - 1,
    }));
  };

  const getEventsforCommunity = () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/eventcommunity/${community.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setEvents(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getEventsforCommunity();
  }, []);

  useEffect(() => {
    setCommunity_data(community);
    setJoined(mode);
    setEvents([]);
    getEventsforCommunity();
  }, [community]);

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

  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <NavBar />
      <div className="px-4 py-10 hide_scroll overflow-scroll h-[491px]">
        <div className="text-white mb-4 flex justify-between items-center ">
          <div className="ml-1 text-2xl ">{community_data.name}</div>
          <div className="flex items-center gap-6 ">
            <div className="text-[#cacbcf] text-sm">
              {community_data.members} Members
            </div>
            {joined === 0 ? (
              <div
                className="bg-blue-600 py-1 px-2 rounded-xl hover:bg-white hover:text-blue-500 transition cursor-pointer"
                onClick={joinCommunity}
              >
                Join Now
              </div>
            ) : (
              <div
                className="bg-blue-600 py-1 px-2 rounded-xl hover:bg-white hover:text-blue-500 transition cursor-pointer"
                onClick={LeaveCommunity}
              >
                Leave
              </div>
            )}
          </div>
        </div>
        <div className="h-[200px] w-full ">
          <img className="h-full w-full" src={community_data.banner_image} />
        </div>
        <div className="mt-4 text-[#cacbcf]">
          <div className="mb-2 flex text-lg">
            <div className=" border-b">About The Community</div>
          </div>
          <div className="text-sm">{community_data.description}</div>
        </div>
        <div className="mt-6 text-[#cacbcf]">
          <div className=" flex text-lg ">
            <div className=" border-b">Upcoming Events</div>
          </div>
          <div className="mt-2 gap-2 flex flex-col">
            {events?.map((item) => (
              <div className="flex items-center gap-2">
                <div>{item.name}</div>
                <div className="text-sm">on {formatedDate(item.date)}</div>
                <div className="flex ">
                  <button className="py-1 px-2 text-sm bg-red-600 rounded-xl text-white hover:bg-white hover:text-red-600 transition">
                    Enter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/createevent"
            state={{
              community_id: community_data.id,
              community_name: community_data.name,
            }}
          >
            <div className="text-white bg-blue-600 p-2 rounded-xl hover:text-blue-600 hover:bg-white transition ">
              Create a Event
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityExplore;
