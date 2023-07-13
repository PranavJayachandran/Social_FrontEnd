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
import { getUserData } from "./utils/basicsetup";
import Event from "./components/Events/Event";
import Events from "./components/Events/Events";
import CreateEvent from "./components/Events/CreateEvent";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";

function App() {
  const [user_data, setUserData] = useState<any>([]);

  useEffect(() => {
    const setUp = async () => {
      let id = localStorage.getItem("user_id");
      if (id != undefined) setUserData(await getUserData(id));
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
        {/* <BrowserRouter basename="/auth">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <BrowserRouter basename="/app">
          <div className="flex">
            <Drawer />
            <div className="w-9/12">
              <Routes>
                <Route path="/home" element={<Main />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/communityjoined" element={<Community />} />
                <Route path="/communityunjoined" element={<Community />} />
                <Route
                  path="/communityexplore"
                  element={<CommunityExplore />}
                />
                <Route path="/createevent" element={<CreateEvent />} />
                <Route path="/events" element={<Events />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter> */}
        <BrowserRouter>
          <Routes>
            <Route path="/app/*" element={<AppLayout />} />
            <Route path="/auth/*" element={<AuthLayout />} />
          </Routes>
        </BrowserRouter>
      </UserDataContext.Provider>
    </div>
  );
}

export default App;
