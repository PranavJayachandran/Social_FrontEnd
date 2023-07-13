import React, { useState, useContext, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { generateRandomString } from "../utils/getRandomName";
import { UserDataContext } from "../context";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASEURL!,
  process.env.REACT_APP_SUPABASEKEY!,
  { auth: { persistSession: false } }
);

const UserData = () => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const [name, setName] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [socials, setSocials] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  let selectedFile = "";

  const handleFileInputChange = async (event: any) => {
    selectedFile = event.target.files[0];
    let name = generateRandomString(10);
    setFileName(name);
    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from("UserImages")
        .upload(`${name}`, selectedFile);
      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        const { data, error } = await supabase.storage
          .from("UserImages")
          .createSignedUrl(`${name}`, 600);
        setImageUrl(data?.signedUrl);
        if (error) console.error("Error while fetching", error.message);
        console.log(data);
        console.log("Image uploaded successfully:", imageUrl);
      }
    }
  };

  const updateUserDetails = () => {
    if (setUserData != undefined) {
      setUserData((prev: any) => ({
        ...prev,
        name: name,
        interests: interests,
        socials: socials,
        user_image: fileName,
        user_image_link: imageUrl,
      }));
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: user_data.id,
      name: name,
      interests: interests,
      socials: socials,
      user_image: fileName,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/user`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("HERE");
        navigate("/app/home");
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (user_data) {
      console.log(user_data);
      setName(user_data.name);
      setSocials(user_data.socials);
      setInterests(user_data.interests);
      setImageUrl(user_data.user_image_link);
    }
  }, [user_data]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-[#17181c] h-[509px] text-white">
      <div className="-mb-6 flex justify-center flex-col items-center">
        <div className="border h-24 w-24 sm:h-32 sm:w-32 flex flex-col justify-center items-center overflow-hidden rounded-full">
          <img src={imageUrl} className="h-24 w-24 sm:h-36 sm:w-36" />
        </div>
        <div className="text-white bg-[#26272e] rounded-xl flex justify-center items-center h-5 w-5 hover:bg-white hover:text-[#26272e] transition">
          <label className="cursor-pointer">
            + <input type="file" id="file" onChange={handleFileInputChange} />
          </label>
        </div>
      </div>
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
          onClick={updateUserDetails}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserData;
