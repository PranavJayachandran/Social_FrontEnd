import React, { useState, useEffect } from "react";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drawer from "./components/Drawer/drawer";
import Main from "./components/Main";
import EditProfile from "./components/EditProfile";
import Community from "./components/Community/Community";
import CommunityExplore from "./components/Community/CommunityExplore";
import { UserDataContext } from "./context";
import getUserData from "./utils/basicsetup";
import Event from "./components/Events/Event";

function App() {
  const [user_data, setUserData] = useState<any>([]);

  useEffect(() => {
    const setUp = async () => {
      setUserData(await getUserData(1));
    };
    setUp();
  }, []);
  return (
    <div>
      <UserDataContext.Provider
        value={{
          user_data,
          setUserData,
        }}
      >
        <div className="flex">
          <Drawer />
          <div className="w-9/12">
            <Routes>
              <Route path="/home" element={<Main />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/communityexplore" element={<CommunityExplore />} />
              <Route path="/event" element={<Event />} />
            </Routes>
          </div>
        </div>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
