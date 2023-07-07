import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import community from "../../interfaces/community";
import Community_Card from "./Community_Card";
import communityState from "../../interfaces/communityState";
import { useLocation } from "react-router-dom";
import { join } from "path";
import { UserDataContext } from "../../context";

const Community = () => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const [communities, setCommunities] = useState<communityState>({ items: [] });

  const addNewCommunities = (result: any) => {
    setCommunities({ items: [] });
    let joinedcommunities: any = [];
    if (user_data && user_data.community_to_user)
      user_data.community_to_user.map((item: any) => {
        joinedcommunities.push(item.community_id);
      });
    if (result)
      result.map((item: any) => {
        var id = item.id;
        if (joinedcommunities.indexOf(id) == -1) {
          setCommunities((prevState) => ({
            items: [...prevState.items, item],
          }));
        }
      });
  };
  const getCommunities = () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/communities`, requestOptions)
      .then((response) => response.json())
      .then((result) => addNewCommunities(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (user_data) getCommunities();
  }, [user_data]);

  const removeCommunity = (id: number) => {
    setCommunities((prevState: any) => {
      if (!prevState) {
        return prevState;
      }
      let filteredItems = [];
      filteredItems = prevState.items.filter((item: any) => {
        if (item.id !== id) return item;
      });
      return { item: filteredItems };
    });
  };
  return (
    <div>
      <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
        <NavBar />
        <div className="py-10 hide_scroll overflow-scroll gap-4 justify-center  flex flex-wrap  h-[491px]">
          {communities && communities.items ? (
            communities.items.map((item: community, index) => (
              <Community_Card
                item={item}
                removeCommunity={removeCommunity}
                key={item.id}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
