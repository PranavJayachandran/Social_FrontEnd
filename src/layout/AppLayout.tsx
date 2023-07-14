import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../components/Main";
import EditProfile from "../components/EditProfile";
import Community from "../components/Community/Community";
import CommunityExplore from "../components/Community/CommunityExplore";
import CreateEvent from "../components/Events/CreateEvent";
import Events from "../components/Events/Events";
import Drawer from "../components/Drawer/drawer";
import { useMediaQuery } from "react-responsive";
import Friends from "../components/Friends/Friends";

const AppLayout = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div className="flex">
      {!isTabletOrMobile ? <Drawer /> : <></>}
      <div className={`${!isTabletOrMobile ? "w-9/12" : "w-full"}`}>
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/communityjoined" element={<Community />} />
          <Route path="/communityunjoined" element={<Community />} />
          <Route path="/communityexplore" element={<CommunityExplore />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/events" element={<Events />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/recommendations" element={<Friends />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
