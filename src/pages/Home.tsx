import React from "react";
import Drawer from "../components/drawer";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="flex">
      <Drawer />
      <Main />
    </div>
  );
};

export default Home;
