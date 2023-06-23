import React from "react";
import option from "../interfaces/drawer_option";

interface Props {
  item: option;
}

const Drawer_options = ({ item }: Props) => {
  return (
    <div className="rounded-xl pl-4 flex items-center h-14 gap-4 text-md cursor-pointer transition hover:bg-[#26272e] hover:text-[#3383f4]">
      <item.icon />
      {item.name}
    </div>
  );
};

export default Drawer_options;
