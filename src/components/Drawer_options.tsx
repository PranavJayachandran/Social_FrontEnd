import React from "react";
import option from "../interfaces/drawer_option";
import { Link } from "react-router-dom";

interface Props {
  item: option;
}

const Drawer_options = ({ item }: Props) => {
  return (
    <Link to={item.name}>
      <div className="rounded-xl pl-4 flex items-center h-14 gap-4 text-md cursor-pointer transition hover:bg-[#26272e] hover:text-[#3383f4]">
        <item.icon />
        {item.name}
      </div>
    </Link>
  );
};

export default Drawer_options;