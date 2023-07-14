import React, { useState } from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

interface communitydata {
  community_id: number;
  community_name: string;
}
const CreateEvent = () => {
  const [drawer, showDrawer] = useState(-100);
  const [dateTime, setDateTime] = useState("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const location = useLocation();
  const { community_id, community_name } = location.state;
  const [community, setCommunity] = useState<communitydata>({
    community_id: community_id,
    community_name: community_name,
  });

  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      community_id: community_id,
      name: name,
      description: description,
      date: dateTime,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/event`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setDateTime("");
    setName("");
    setDescription("");
    window.history.back();
  };
  return (
    <div className="border-l h-full border-[#8d8e92] w-full bg-[#17181c]">
      <NavBar drawer={drawer} showDrawer={showDrawer} />
      <div className="hide_scroll overflow-scroll  flex h-[684px] sm:h-[491px]">
        <div className="text-white flex px-10 flex-col gap-2 justify-center w-full">
          <div className="text-lg sm:text-2xl text-center">
            Community: {community.community_name}
          </div>
          <div className="mt-2 sm:mt-[0px] flex flex-col sm:text-base text-sm gap-1">
            <label>Event Name</label>
            <input
              className="bg-[#343440] rounded-xl p-2"
              placeholder="Enter the name of the event"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:text-base text-sm gap-1">
            <label>Description</label>
            <input
              placeholder="Describe the event in maximum 100 words"
              className="bg-[#343440] rounded-xl p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-10 items-center justify-center flex">
            <div className="flex flex-col gap-1">
              <div className="text-center">Time</div>
              <input
                className="flex bg-[#343440]  rounded-xl p-2"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
            <div></div>
          </div>
          <div className="sm:text-base text-sm flex justify-center mt-4">
            <div
              className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-white hover:text-blue-600 transition cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
