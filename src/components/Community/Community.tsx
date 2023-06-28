import React from "react";
import NavBar from "./NavBar";
import community from "../../interfaces/community";
import Community_Card from "./Community_Card";

const Image1: React.FC = () => (
  <img src="https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" />
);
const Image2: React.FC = () => (
  <img src="https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" />
);
const Image3: React.FC = () => (
  <img src="https://th.bing.com/th?id=OIP.Wytlw5AmN2HoCJ_kLGF1EgHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" />
);

var communitys: Array<community> = [
  {
    name: "Community One",
    members: 123,
    image: Image1,
  },
  {
    name: "Community Two",
    members: 123,
    image: Image2,
  },
  {
    name: "Community Three",
    members: 123,
    image: Image3,
  },
  {
    name: "Community One",
    members: 123,
    image: Image1,
  },
  {
    name: "Community Two",
    members: 123,
    image: Image2,
  },
  {
    name: "Community Three",
    members: 123,
    image: Image3,
  },
  {
    name: "Community One",
    members: 123,
    image: Image1,
  },
  {
    name: "Community Two",
    members: 123,
    image: Image2,
  },
  {
    name: "Community Three",
    members: 123,
    image: Image3,
  },
];

const Community = () => {
  return (
    <div>
      <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
        <NavBar />
        <div className="py-10 hide_scroll overflow-scroll gap-4 justify-center  flex flex-wrap  h-[498px]">
          {communitys.map((item) => (
            <Community_Card item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
