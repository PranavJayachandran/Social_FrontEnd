import React, { useState } from "react";

const CreateEvent = () => {
  const [dateTime, setDateTime] = useState("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      community_id: 1,
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
  };
  return (
    <div className="text-white flex px-10 flex-col gap-2 justify-center w-full">
      <div className="flex flex-col  gap-1">
        <label>Event Name</label>
        <input
          className="bg-[#343440] rounded-xl p-2"
          placeholder="Enter the name of the event"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
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
      <div className="flex justify-center mt-4">
        <div
          className="bg-[#343440] px-4 py-2 rounded-xl hover:bg-white hover:text-[#1e1f23] transition cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
