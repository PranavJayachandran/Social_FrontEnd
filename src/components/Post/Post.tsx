import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import post from "../../interfaces/post";
import Comments from "./Comments";

interface Props {
  item: post;
}
const Post = ({ item }: Props) => {
  const [post, setPost] = useState<post>(item);
  const [liked_disliked_by_user, setliked_disliked_by_user] =
    useState<number>(-2);
  let like_dislike_value = -2;

  const postLikeDislike = async (prev: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      post_id: item.id,
      value: like_dislike_value,
      user_id: item.user_id,
      prev: prev,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/likesdislikes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const toggleLikeDislike = (prev: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      post_id: item.id,
      value: like_dislike_value,
      user_id: item.user_id,
      prev: prev,
    });

    var requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/likesdislikes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const like = () => {
    console.log("Called");
    if (liked_disliked_by_user == 1) {
      {
        setliked_disliked_by_user(liked_disliked_by_user - 1);
        like_dislike_value = 0;
        setPost((prevState) => ({ ...prevState, likes: post.likes - 1 }));
        toggleLikeDislike(1);
      }
    } else if (liked_disliked_by_user == -1) {
      setliked_disliked_by_user(1);
      like_dislike_value = 1;
      setPost((prevState) => ({ ...prevState, dislikes: post.dislikes - 1 }));
      setPost((prevState) => ({ ...prevState, likes: post.likes + 1 }));
      toggleLikeDislike(-1);
    } else if (liked_disliked_by_user == 0) {
      like_dislike_value = 1;
      setPost((prevState) => ({ ...prevState, likes: post.likes + 1 }));
      setliked_disliked_by_user(1);
      toggleLikeDislike(0);
    } else {
      like_dislike_value = 1;
      setPost((prevState) => ({ ...prevState, likes: post.likes + 1 }));
      setliked_disliked_by_user(1);
      postLikeDislike(-2);
    }
  };
  const dislike = () => {
    if (liked_disliked_by_user == 1) {
      setliked_disliked_by_user(-1);
      like_dislike_value = -1;
      setPost((prevState) => ({ ...prevState, likes: post.likes - 1 }));
      setPost((prevState) => ({ ...prevState, dislikes: post.dislikes + 1 }));
      toggleLikeDislike(1);
    } else if (liked_disliked_by_user == -1) {
      like_dislike_value = 0;
      setliked_disliked_by_user(0);
      setPost((prevState) => ({ ...prevState, dislikes: post.dislikes - 1 }));
      toggleLikeDislike(-1);
    } else if (liked_disliked_by_user == 0) {
      like_dislike_value = -1;
      setPost((prevState) => ({ ...prevState, dislikes: post.dislikes + 1 }));
      setliked_disliked_by_user(-1);
      toggleLikeDislike(0);
    } else {
      like_dislike_value = -1;
      setPost((prevState) => ({ ...prevState, dislikes: post.dislikes + 1 }));
      setliked_disliked_by_user(-1);
      postLikeDislike(-2);
    }
  };
  useEffect(() => {
    let exists = item.likes_dislikes.find((obj) => obj.user_id == 1);
    if (exists) {
      setliked_disliked_by_user(exists.value);
      console.log(exists.value);
    }
  }, [item]);
  return (
    <div className="px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden bg-teal-100 rounded-full">
          <img src={post.user_image} />
        </div>
        <div className="text-sm">
          <div>{post.username}</div>
          <div className="flex text-xs items-center gap-1">
            <AiOutlineClockCircle />
            <div>10 mins ago</div>
          </div>
        </div>
      </div>
      <div>{post.content}</div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <div>
            <AiFillLike
              className={`h-5 w-5 cursor-pointer ${
                liked_disliked_by_user == 1 ? "text-blue-500" : ""
              }`}
              onClick={like}
            />
          </div>
          <div className="text-sm">{post.likes}</div>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <AiFillDislike
              className={`h-5 w-5 cursor-pointer ${
                liked_disliked_by_user == -1 ? "text-red-500" : ""
              }`}
              onClick={dislike}
            />
          </div>
          <div className="text-sm">{post.dislikes}</div>
        </div>
      </div>
      <Comments
        item={post.comments}
        post_id={post.id}
        comment_id={post.comment_id}
        user_id={post.user_id}
      />
    </div>
  );
};

export default Post;
