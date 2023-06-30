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
    useState<number>(0);
  const like = () => {
    if (liked_disliked_by_user == 1) {
      {
        setliked_disliked_by_user(liked_disliked_by_user - 1);
      }
    } else if (liked_disliked_by_user == 1) setliked_disliked_by_user(0);
    else {
      setPost((prevState) => ({ ...prevState, likes: post.likes + 1 }));
      setliked_disliked_by_user(liked_disliked_by_user + 1);
    }
  };
  const dislike = () => {
    if (liked_disliked_by_user == -1) {
      setliked_disliked_by_user(liked_disliked_by_user + 1);
    } else if (liked_disliked_by_user == 1) setliked_disliked_by_user(0);
    else {
      setPost((prevState) => ({ ...prevState, dislikes: post.dislikes + 1 }));
      setliked_disliked_by_user(liked_disliked_by_user - 1);
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
              className={`h-5 w-5 ${
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
              className={`h-5 w-5 ${
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
      />
    </div>
  );
};

export default Post;
