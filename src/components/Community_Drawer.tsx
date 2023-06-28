import React from "react";
import community from "../interfaces/community";

interface Props {
  item: community;
}

const Community_Drawer = ({ item }: Props) => {
  return (
    <div className="flex rounded-xl gap-4 items-center py-4 px-2  cursor-pointer transition hover:bg-[#26272e]">
      <div className="rounded-full overflow-hidden">
        <item.image />
      </div>
      <div>
        <div className="text-[#cacbcf]">{item.name}</div>
        <div className="text-xs">{item.members} memebers</div>
      </div>
    </div>
  );
};
export default Community_Drawer;
