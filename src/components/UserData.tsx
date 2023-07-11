import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASEURL!,
  process.env.REACT_APP_SUPABASEKEY!,
  { auth: { persistSession: false } }
);

const UserData = () => {
  const [name, setName] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [socials, setSocials] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>("");

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from("UserImages")
        .upload(`${selectedFile.name}`, selectedFile);
      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        const { data, error } = await supabase.storage
          .from("UserImages")
          .createSignedUrl(`${selectedFile.name}`, 6000);
        setImageUrl(data?.signedUrl);
        if (error) console.error("Error while fetching", error.message);
        console.log(data);
        console.log("Image uploaded successfully:", imageUrl);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-[#17181c] h-[509px] text-white">
      <div>
        <div>
          <div className="flex justify-center h-28 w-28 border rounded-full bg-green-200">
            <img src={imageUrl} className="h-28 rounded-full w-28" />
          </div>
          <div className="flex justify-center items-center flex-col">
            <label htmlFor="upload" className="mt-2 custom-file-upload">
              <input type="file" onChange={handleFileInputChange} />
            </label>
            <button
              className="text-xs bg-blue-200 hover:bg-white hover:text-blue-200 transition p-1 rounded-xl mt-2"
              onClick={handleUpload}
            >
              Upload Image
            </button>
          </div>
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
          onClick={() => console.log(name, interests, socials)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserData;
