import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import community from "../../interfaces/community";
import Community_Card from "./Community_Card";
import communityState from "../../interfaces/communityState";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context";

const Community = () => {
  const location = useLocation();
  const { user_data, setUserData } = useContext(UserDataContext);
  const [joinedCommunities, setJoinedCommunities] = useState<communityState>({
    items: [],
  });
  const [unjoinedCommunities, setUnJoinedCommunities] =
    useState<communityState>({
      items: [],
    });

  const addNewCommunities = (result: any) => {
    setJoinedCommunities({ items: [] });
    setUnJoinedCommunities({ items: [] });
    let unjoinedcommunities: any = [];
    if (user_data && user_data.community_to_user)
      user_data.community_to_user.map((item: any) => {
        unjoinedcommunities.push(item.community_id);
      });
    if (result)
      result.map((item: any) => {
        var id = item.id;
        if (unjoinedcommunities.indexOf(id) == -1) {
          setUnJoinedCommunities((prevState) => ({
            items: [...prevState.items, item],
          }));
        } else {
          setJoinedCommunities((prevState) => ({
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
    if (user_data) {
      getCommunities();
    }
  }, [user_data]);

  const removeCommunity = (id: number, mode: number) => {
    if (mode === 1) {
      setUnJoinedCommunities((prevState: any) => {
        if (!prevState) {
          return prevState;
        }
        let filteredItems = [];
        filteredItems = prevState.items.filter((item: any) => {
          if (item.id !== id) return item;
        });
        return { item: filteredItems };
      });
    }
    if (mode === 0) {
      setJoinedCommunities((prevState: any) => {
        if (!prevState) {
          return prevState;
        }
        let filteredItems = [];
        filteredItems = prevState.items.filter((item: any) => {
          if (item.id !== id) return item;
        });
        return { item: filteredItems };
      });
    }
  };
  return (
    <div>
      <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
        <NavBar />

        {(() => {
          switch (location.pathname) {
            case "/communityjoined":
              return (
                <div className="h-[497px] hide_scroll overflow-scroll ">
                  <div className="py-10 gap-4 justify-center  flex flex-wrap  ">
                    {joinedCommunities && joinedCommunities.items ? (
                      joinedCommunities.items.map((item: community) => (
                        <Community_Card
                          item={item}
                          removeCommunity={removeCommunity}
                          key={item.id}
                          mode={0}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            case "/communityunjoined":
              return (
                <div className="h-[497px] hide_scroll overflow-scroll ">
                  <div className="py-10 gap-4 justify-center  flex flex-wrap  ">
                    {unjoinedCommunities && unjoinedCommunities.items ? (
                      unjoinedCommunities.items.map((item: community) => (
                        <Community_Card
                          item={item}
                          removeCommunity={removeCommunity}
                          key={item.id}
                          mode={1}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default Community;
