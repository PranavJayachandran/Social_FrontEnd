import React, { useState } from "react";

const UserData = () => {
  const [name, setName] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [socials, setSocials] = useState<string>("");
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-[#17181c] h-[503px] text-white">
      <div>
        <label className="mr-4">Name</label>
        <input
          className="text-sm px-4 py-3 bg-[#26272e] border border-[#8d8e92] rounded-lg"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="mr-4">Interests</label>
        <input
          className="text-sm px-4 py-3 bg-[#26272e] border border-[#8d8e92] rounded-lg"
          placeholder="Enter your interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
      </div>
      <div>
        <label className="mr-4">Socials</label>
        <input
          className="text-sm px-4 py-3 bg-[#26272e] border border-[#8d8e92] rounded-lg"
          placeholder="Enter your socials"
          value={socials}
          onChange={(e) => setSocials(e.target.value)}
        />
      </div>
      <div>
        <button
          className="bg-[#26272e] px-4 py-2 rounded-xl text-sm transition hover:bg-white hover:text-[#26272e]"
          onClick={() => console.log(name, interests, socials)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserData;
