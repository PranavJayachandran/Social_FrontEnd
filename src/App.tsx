import React from "react";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drawer from "./components/drawer";
import Main from "./components/Main";
import EditProfile from "./components/EditProfile";
import Community from "./components/Community/Community";
import CommunityExplore from "./components/Community/CommunityExplore";

function App() {
  return (
    <div>
      <div className="flex">
        <Drawer />
        <div className="w-9/12">
          <Routes>
            <Route path="/home" element={<Main />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/communityexplore" element={<CommunityExplore />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
