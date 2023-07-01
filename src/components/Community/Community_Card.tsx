import React from "react";
import community from "../../interfaces/community";
import { Link } from "react-router-dom";

interface Props {
  item: community;
}

const Community_Card = ({ item }: Props) => {
  return (
    <div className="flex flex-col w-1/4 p-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
      <div className="h-48 w-48 flex justify-center items-center">
        <div className="h-60 w-60 flex justify-center items-center overflow-hidden">
          <img src={item.cover_image} />
        </div>
      </div>
      <div>
        <div className="text-xl">{item.name}</div>
        <div className="text-xs">{item.members} Members</div>
        <div className="mt-6 flex justify-center gap-3">
          <button className="bg-[#343440] px-2 py-2 rounded-xl border border-[#343440] hover:bg-transparent transition ">
            Join Now
          </button>
          <Link to={"/communityexplore"} state={item}>
            <button className="bg-[#343440] px-2 py-2 rounded-xl border border-[#343440] hover:bg-transparent transition ">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Community_Card;
