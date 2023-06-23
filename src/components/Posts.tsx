import React from "react";
import CreatePost from "./CreatePost";
import post from "../interfaces/post";
import Post from "./Post";

var posts: Array<post> = [
  {
    username: "USER0",
    time: new Date(1687477032),
    community_name: "Community Name",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas diam. Vehicula ipsum a arcu cursus. Odio pellentesque diam volutpat commodo sed egestas egestas. ",
    likes: 10,
    comments: [
      {
        username: "USer1",
        comment: "This is good",
        upvote: 20,
        downvote: 1,
      },
      {
        username: "USer2",
        comment: "This is okay",
        upvote: 22,
        downvote: 6,
      },
    ],
  },
  {
    username: "USER9",
    time: new Date(1687433032),
    community_name: "Community Name",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas diam. Vehicula ipsum a arcu cursus. Odio pellentesque diam volutpat commodo sed egestas egestas. ",
    likes: 10,
    comments: [
      {
        username: "USer1",
        comment: "This is good",
        upvote: 20,
        downvote: 1,
      },
      {
        username: "USer2",
        comment: "This is okay",
        upvote: 22,
        downvote: 6,
      },
    ],
  },
];
const Posts = () => {
  return (
    <div className="mx-14 py-10 w-2/3">
      <CreatePost />
      <div className="mt-8 flex flex-col gap-8">
        {posts.map((post) => (
          <Post item={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
