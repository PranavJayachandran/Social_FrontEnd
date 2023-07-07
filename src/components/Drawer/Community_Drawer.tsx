import React, { useEffect } from "react";
import community from "../../interfaces/community";
import { Link } from "react-router-dom";

interface Props {
  item: community;
}

const Community_Drawer = ({ item }: Props) => {
  useEffect(() => {
    console.log("COM", item);
  }, [item]);
  return (
    <Link to={"/communityexplore"} state={{ data: item, mode: 1 }}>
      <div className="flex rounded-xl gap-4 items-center py-4 px-2  cursor-pointer transition hover:bg-[#26272e]">
        <div className="rounded-full overflow-hidden h-16 w-16 flex justify-center items-center">
          <img src={item.cover_image} />
        </div>
        <div>
          <div className="text-[#cacbcf]">{item.name}</div>
          <div className="text-xs">{item.members} memebers</div>
        </div>
      </div>
    </Link>
  );
};
export default Community_Drawer;
