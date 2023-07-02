import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import community from "../../interfaces/community";
import { UserDataContext } from "../../context";

const CommunityExplore = () => {
  const location = useLocation();
  const data = location.state;
  const [community_data, setCommunity_data] = useState<community>(data);
  const { user_data, setUserData } = useContext(UserDataContext);

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

    fetch("http://localhost:5000/communitytouser", requestOptions)
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.log("error", error));

    if (setUserData != undefined)
      setUserData((prevState: any) => ({
        ...prevState,
        community_to_user: [
          ...prevState.community_to_user,
          { community_id: community_data.id },
        ],
      }));
    setCommunity_data((prevState) => ({
      ...prevState,
      members: prevState.members + 1,
    }));
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
            <div
              className="bg-blue-600 py-1 px-2 rounded-xl hover:bg-white hover:text-blue-500 transition cursor-pointer"
              onClick={joinCommunity}
            >
              Join Now
            </div>
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
      </div>
    </div>
  );
};

export default CommunityExplore;
