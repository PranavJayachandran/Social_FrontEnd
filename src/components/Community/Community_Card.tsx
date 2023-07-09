import React, { useState, useEffect, useContext } from "react";
import community from "../../interfaces/community";
import { Link } from "react-router-dom";
import communityState from "../../interfaces/communityState";
import { UserDataContext } from "../../context";

interface Props {
  item: community;
  mode: number;
  removeCommunity: (newValue: number, mode: number) => void;
}

const Community_Card = ({ item, mode, removeCommunity }: Props) => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const [community, setCommunity] = useState<community>(item);
  const joinCommunity = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: 1,
      community_id: community.id,
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
    setCommunity((prevState) => ({
      ...prevState,
      members: community.members + 1,
    }));
    if (setUserData != undefined)
      setUserData((prevState: any) => ({
        ...prevState,
        community_to_user: [
          ...prevState.community_to_user,
          { community_id: community.id, community: community },
        ],
      }));
    removeCommunity(community.id, mode);
  };
  const leaveCommunity = () => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   user_id: 1,
    //   community_id: community.id,
    // });

    // var requestOptions: RequestInit = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${process.env.REACT_APP_BACKEND}/communitytouser`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {})
    //   .catch((error) => console.log("error", error));

    setCommunity((prevState) => ({
      ...prevState,
      members: community.members - 1,
    }));

    // if (setUserData != undefined) {
    //   setUserData((prevState: any) => {
    //     if (!prevState) {
    //       return prevState;
    //     }
    //     let filteredItems = [];
    //     filteredItems = prevState.community_to_user.filter((item: any) => {
    //       if (item.id !== community.id) return item;
    //     });
    //     return { item: filteredItems };
    //   });
    // }
    // removeCommunity(community.id, mode);
  };
  return (
    <div className="flex flex-col w-1/4 p-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
      <div className="h-48 w-48 flex justify-center items-center">
        <div className="h-60 w-60 flex justify-center items-center overflow-hidden">
          <img src={community.cover_image} />
        </div>
      </div>
      <div>
        <div className="text-xl">{community.name}</div>
        <div className="text-xs">{community.members} Members</div>
        {mode == 1 ? (
          <div className="mt-6 flex justify-center gap-3">
            <button
              className="bg-blue-600 py-2 px-2 rounded-xl hover:bg-white hover:text-blue-500 transition cursor-pointer text-white"
              onClick={joinCommunity}
            >
              Join Now
            </button>
            <Link
              to={"/communityexplore"}
              state={{ community: community, mode: 0 }}
            >
              <button className="bg-[#343440] px-2 py-2 rounded-xl border border-[#343440] hover:bg-transparent transition ">
                Explore
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 text-white transition hover:bg-white hover:text-red-500 bg-red-500 rounded-xl"
              onClick={leaveCommunity}
            >
              Leave
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community_Card;
