import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../components/Main";
import EditProfile from "../components/EditProfile";
import Community from "../components/Community/Community";
import CommunityExplore from "../components/Community/CommunityExplore";
import CreateEvent from "../components/Events/CreateEvent";
import Events from "../components/Events/Events";
import Drawer from "../components/Drawer/drawer";

const AppLayout = () => {
  return (
    <div className="flex">
      <Drawer />
      <div className="w-9/12">
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/communityjoined" element={<Community />} />
          <Route path="/communityunjoined" element={<Community />} />
          <Route path="/communityexplore" element={<CommunityExplore />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
