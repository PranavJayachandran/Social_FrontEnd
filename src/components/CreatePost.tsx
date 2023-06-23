import React from "react";

const CreatePost = () => {
  return (
    <div className="px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
      <div className="flex gap-4 ">
        <div className="h-8 w-8 rounded-full bg-green-100"></div>
        <input
          className="px-4 w-full rounded-xl bg-[#343440]"
          placeholder="What's on your mind?"
        />
      </div>
      <div className="flex justify-center mt-4 ">
        <div className="border px-6 rounded-lg py-1 cursor-pointer transition hover:bg-[#343440] hover:border-[#343440] hover:text-white">
          Post
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
