import React, { useState, useContext } from "react";
import PostSate from "../../interfaces/postState";
import post from "../../interfaces/post";
import { UserDataContext } from "../../context";
import { getImageSigned } from "../../utils/basicsetup";

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<PostSate>>;
}

const CreatePost = ({ setPosts }: Props) => {
  const [content, setContent] = useState<string>("");
  const { user_data, setUserData } = useContext(UserDataContext);
  let date = new Date();

  const signImage = async (image: string) => {
    let imageUrl = await getImageSigned(image, "UserImages", 6000);
    if (imageUrl == undefined) return "";
    return imageUrl;
  };
  async function post() {
    var post: post = {
      id: user_data.id,
      username: user_data.name,
      user_id: user_data.id,
      user_image: user_data.user_image_link,
      time: new Date(date.getTime()),
      community_name: "Community Name",
      content: content,
      likes: 0,
      comments: [],
      dislikes: 0,
      comment_id: [],
      likes_dislikes: [
        {
          value: -2,
          user_id: user_data.id,
          id: 0,
        },
      ],
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: content,
      user_id: user_data.id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/post`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        post.id = parseInt(result);
        setPosts((prevState) => ({
          items: [post, ...prevState.items],
        }));
      })
      .catch((error) => console.log("error", error));

    setContent("");
  }
  return (
    <div className="px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92]">
      <div className="flex gap-4 ">
        <div className="sm:h-8 sm:w-8 h-6 w-6 rounded-full bg-green-100 overflow-hidden">
          <img src={user_data.user_image_link} className="h-full w-full" />
        </div>
        <input
          className="sm:text-base text-xs px-4 w-full rounded-xl bg-[#343440]"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          className="sm:text-base text-xs border sm:px-6 px-4 rounded-lg py-1 cursor-pointer transition hover:bg-[#343440] hover:border-[#343440] hover:text-white"
          onClick={post}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
