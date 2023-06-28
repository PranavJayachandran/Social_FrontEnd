import React, { useState } from "react";
import PostSate from "../interfaces/postState";
import post from "../interfaces/post";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<PostSate>>;
}

const CreatePost = ({ setPosts }: Props) => {
  const [content, setContent] = useState<string>("");

  async function post() {
    var post: post = {
      username: "item.username",
      user_id: "1",
      user_image: "1",
      time: new Date(123213213),
      community_name: "Community Name",
      content: content,
      likes: 0,
      comments: [],
      dislikes: 0,
    };
    setPosts((prevState) => ({
      items: [post, ...prevState.items],
    }));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: content,
      user_id: 1,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/post", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setContent("");
  }
  return (
    <div className="px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
      <div className="flex gap-4 ">
        <div className="h-8 w-8 rounded-full bg-green-100"></div>
        <input
          className="px-4 w-full rounded-xl bg-[#343440]"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          className="border px-6 rounded-lg py-1 cursor-pointer transition hover:bg-[#343440] hover:border-[#343440] hover:text-white"
          onClick={post}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
