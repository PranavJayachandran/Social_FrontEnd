import React from "react";
import Main from "../components/Main";
import Drawer from "../components/Drawer/drawer";

const Home = () => {
  return (
    <div className="flex">
      <Drawer />
      <Main />
    </div>
  );
};

export default Home;
