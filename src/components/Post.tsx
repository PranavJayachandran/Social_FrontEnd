import React from "react";
import post from "../interfaces/post";
import { AiOutlineClockCircle } from "react-icons/ai";

interface Props {
  item: post;
}
const Post = ({ item }: Props) => {
  return (
    <div className="px-4 py-4 bg-[#1e1f23] rounded-xl text-[#8d8e92] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-teal-100 rounded-full"></div>
        <div className="text-sm">
          <div>{item.username}</div>
          <div className="flex text-xs items-center gap-1">
            <AiOutlineClockCircle />
            <div>10 mins ago</div>
          </div>
        </div>
      </div>
      <div>{item.content}</div>
      <div className="flex gap-4 mt-6">
        <div className="h-8 w-8 rounded-full bg-teal-100"></div>
        <input
          className="px-4 py-1 w-full rounded-xl bg-[#343440]"
          placeholder="What's on your mind?"
        />
      </div>
      <div className="mt-4">
        <div>Comments</div>
        <div className="w-full mt-2">
          {item.comments.map((item) => (
            <div className="mt-2 items-center flex gap-4 w-full text-sm">
              <div className="h-6 w-6 rounded-full bg-violet-100"></div>
              <div className="w-full">
                <div>
                  <span className="font-semibold text-white">
                    {item.username}:
                  </span>{" "}
                  {item.comment}
                </div>
                <div className="flex text-xs w-full justify-between">
                  <div>Reply Comment</div>
                  <div className="flex">
                    <div className="border-r pr-2">Upvote {item.upvote}</div>
                    <div className="pl-2">Downvote {item.downvote}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
