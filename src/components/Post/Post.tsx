import React, { useEffect, useState, useContext } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import post from "../../interfaces/post";
import Comments from "./Comments";
import { UserDataContext } from "../../context";

interface Props {
  item: post;
}
const Post = ({ item }: Props) => {
  const [post, setPost] = useState<post>(item);
  const [liked_disliked_by_user, setliked_disliked_by_user] =
    useState<number>(-2);
  const { user_data, setUserData } = useContext(UserDataContext);
  let like_dislike_value = -2;

  const postLikeDislike = async (prev: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      post_id: item.id,
      value: like_dislike_value,
      user_id: user_data.id,
      prev: prev,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/likesdislikes`, requestOptions)
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
      user_id: user_data.id,
      prev: prev,
    });

    var requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/likesdislikes`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const like = () => {
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

  const timeDifference = (date: Date) => {
    let current_date = new Date(Date.now());
    let year = current_date.getFullYear() - date.getFullYear();
    let month = current_date.getMonth() - date.getMonth();
    let bydate = current_date.getDate() - date.getDate();
    if (year > 1) return `${year} years ago`;
    else if (year == 1) return `${year} year ago`;

    if (month > 1) return `${month} months ago`;
    else if (month == 1) return `${month} month ago`;

    if (bydate > 1) return `${bydate} days ago`;
    else if (bydate == 1) return `${bydate} day ago`;
    else return `Just now`;
  };
  useEffect(() => {
    let exists = item.likes_dislikes.find((obj) => obj.user_id == user_data.id);
    console.log(item.likes_dislikes, user_data.id);
    if (exists) {
      setliked_disliked_by_user(exists.value);
    }
    console.log(post);
  }, [item, user_data]);
  return (
    <div className="sm-text-base text-sm px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="sm:h-8 sm:w-8 h-6 w-6 overflow-hidden bg-teal-100 rounded-full">
          <img className="h-full w-full" src={post.user_image} />
        </div>
        <div className="text-xs sm:text-sm">
          <div>{post.username}</div>
          <div className="flex text-xs items-center gap-1">
            <AiOutlineClockCircle className="sm:h-3 sm:w-3 " />
            <div className="text-xs">{timeDifference(post.time)}</div>
          </div>
        </div>
      </div>
      <div className="text-xs sm:text-base">{post.content}</div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <div>
            <AiFillLike
              className={`sm:h-5 sm:w-5 h-3 w-3 cursor-pointer ${
                liked_disliked_by_user == 1 ? "text-blue-500" : ""
              }`}
              onClick={like}
            />
          </div>
          <div className="text-xs sm:text-sm">{post.likes}</div>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <AiFillDislike
              className={`sm:h-5 sm:w-5 h-3 w-3 cursor-pointer ${
                liked_disliked_by_user == -1 ? "text-red-500" : ""
              }`}
              onClick={dislike}
            />
          </div>
          <div className="text-xs sm:text-sm">{post.dislikes}</div>
        </div>
      </div>
      <Comments
        item={post.comments}
        post_id={post.id}
        comment_id={post.comment_id}
        user_id={user_data.id}
        user_image={user_data.image}
      />
    </div>
  );
};

export default Post;
