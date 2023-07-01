import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import community from "../../interfaces/community";
import Community_Card from "./Community_Card";
import communityState from "../../interfaces/communityState";

const Community = () => {
  const [communities, setCommunities] = useState<communityState>();
  const getCommunities = () => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/communities", requestOptions)
      .then((response) => response.json())
      .then((result) => setCommunities({ item: result }))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getCommunities();
  }, []);
  return (
    <div>
      <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
        <NavBar />
        <div className="py-10 hide_scroll overflow-scroll gap-4 justify-center  flex flex-wrap  h-[491px]">
          {communities?.item.map((item: community) => (
            <Community_Card item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
