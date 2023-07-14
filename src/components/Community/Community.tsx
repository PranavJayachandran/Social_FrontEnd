import React, { useState, useEffect, useContext } from "react";
import community from "../../interfaces/community";
import Community_Card from "./Community_Card";
import communityState from "../../interfaces/communityState";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context";
import { useMediaQuery } from "react-responsive";
import Drawer from "../Drawer/drawer";
import { motion } from "framer-motion";
import { CgCommunity } from "react-icons/cg";
import NavBar from "../Navbar";

const Community = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const location = useLocation();
  const { user_data, setUserData } = useContext(UserDataContext);
  const [joinedCommunities, setJoinedCommunities] = useState<communityState>({
    items: [],
  });
  const [drawer, showDrawer] = useState(-300);
  let p = 0;
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
    if (user_data && p == 0) {
      p = 1;
      getCommunities();
      console.log(user_data);
    }
  }, [user_data]);

  useEffect(() => {
    console.log(joinedCommunities, unjoinedCommunities);
  }, [joinedCommunities, unjoinedCommunities]);

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
      <div className="border-l h-full border-[#8d8e92] flex-col flex justify-center  w-full bg-[#17181c]">
        <NavBar
          showDrawer={showDrawer}
          drawer={drawer}
          icon={<CgCommunity className="sm:h-6 sm:w-6 h-4 w-4" />}
          name="Community"
        />
        {isTabletOrMobile ? (
          <motion.div className="text-white absolute" animate={{ x: drawer }}>
            <Drawer />
          </motion.div>
        ) : (
          <></>
        )}
        {(() => {
          switch (location.pathname) {
            case "/app/communityjoined":
              return (
                <div
                  className={`${
                    isTabletOrMobile ? "h-[684px]" : "h-[497px]"
                  } hide_scroll overflow-scroll`}
                >
                  <div className="text-[12px] sm:text-sm flex gap-2 sm:gap-4 items-center">
                    <div className="mt-4 w-full gap-2 flex justify-center items-center">
                      <Link to="/app/communityjoined">
                        <div className="bg-[#72728c] text-center  text-white rounded-lg p-2">
                          Joined Communities
                        </div>
                      </Link>
                      <Link to="/app/communityunjoined">
                        <div className="text-white">Unjoined Communities</div>
                      </Link>
                    </div>
                  </div>
                  <div className="py-10  w-full gap-4 justify-center  flex flex-wrap  ">
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
            case "/app/communityunjoined":
              return (
                <div
                  className={`${
                    isTabletOrMobile ? "h-[684px]" : "h-[497px]"
                  } hide_scroll overflow-scroll`}
                >
                  <div className="text-[12px] sm:text-sm flex gap-2 sm:gap-4 items-center">
                    <div className="mt-4 w-full gap-2 flex justify-center items-center">
                      <Link to="/app/communityjoined">
                        <div className="text-white">Joined Communities</div>
                      </Link>
                      <Link to="/app/communityunjoined">
                        <div className="bg-[#72728c] text-white rounded-lg p-2">
                          Unjoined Communities
                        </div>
                      </Link>
                    </div>
                  </div>
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
