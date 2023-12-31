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
      user_id: user_data.id,
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
    if (setUserData != undefined && user_data.community_to_user)
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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user_data.id,
      community_id: community.id,
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

    setCommunity((prevState) => ({
      ...prevState,
      members: community.members - 1,
    }));

    if (setUserData != undefined && user_data.community_to_user) {
      setUserData((prevState: any) => {
        let filteredItems = [];
        filteredItems = prevState.community_to_user.filter((item: any) => {
          if (item.community_id !== community.id) {
            {
              return item;
            }
          }
        });
        return {
          ...prevState,
          community_to_user: filteredItems,
        };
      });
    }
    removeCommunity(community.id, mode);
  };
  return (
    <div className=" flex flex-col sm:w-1/4 w-1/3 p-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
      <div className="sm:h-48  sm:w-48 flex justify-center items-center">
        <div className="h-28 w-28 sm:h-60 sm:w-60 flex justify-center items-center overflow-hidden">
          <img src={community.cover_image} />
        </div>
      </div>
      <div>
        <div className="text-base sm:text-xl">{community.name}</div>
        <div className="text-[10px] sm:text-xs">
          {community.members} Members
        </div>
        {mode == 1 ? (
          <div className="mt-6 flex justify-center gap-3">
            <button
              className="bg-blue-600 sm:text-base text-[10px] p-2 sm:px-4 sm:py-2 rounded-xl hover:bg-white hover:text-blue-500 transition cursor-pointer text-white"
              onClick={joinCommunity}
            >
              Join
            </button>
            <Link
              to={"/app/communityexplore"}
              state={{ community: community, mode: 0 }}
            >
              <button className="bg-[#343440] sm:text-base text-[10px] p-2 sm:px-4 sm:py-2 rounded-xl border border-[#343440] hover:bg-transparent transition ">
                Explore
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center gap-3 mt-6">
            <button
              className="sm:text-base text-[10px] p-2 sm:px-4 sm:py-2 text-white transition hover:bg-white hover:text-red-500 bg-red-500 rounded-xl"
              onClick={leaveCommunity}
            >
              Leave
            </button>
            <Link
              to={"/app/communityexplore"}
              state={{ community: community, mode: 1 }}
            >
              <button className="bg-[#343440] sm:text-base text-[10px] p-2 sm:px-4 sm:py-2 rounded-xl border border-[#343440] hover:bg-transparent transition ">
                Explore
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community_Card;
