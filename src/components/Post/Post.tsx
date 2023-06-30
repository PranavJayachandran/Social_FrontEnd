import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import post from "../../interfaces/post";
import Comments from "./Comments";

interface Props {
  item: post;
}
const Post = ({ item }: Props) => {
  return (
    <div className="px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden bg-teal-100 rounded-full">
          <img src={item.user_image} />
        </div>
        <div className="text-sm">
          <div>{item.username}</div>
          <div className="flex text-xs items-center gap-1">
            <AiOutlineClockCircle />
            <div>10 mins ago</div>
          </div>
        </div>
      </div>
      <div>{item.content}</div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <div>
            <AiFillLike className="h-5 w-5" />
          </div>
          <div className="text-sm">{item.likes}</div>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <AiFillDislike className="h-5 w-5" />
          </div>
          <div className="text-sm">{item.dislikes}</div>
        </div>
      </div>
      <Comments
        item={item.comments}
        post_id={item.id}
        comment_id={item.comment_id}
      />
    </div>
  );
};

export default Post;
