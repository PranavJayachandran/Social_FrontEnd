import React, { useEffect, useState } from "react";
import PostSate from "../../interfaces/postState";
import post from "../../interfaces/post";
import CreatePost from "../CreatePost";
import Post from "./Post";

// var posts: Array<post> = [
//   {
//     username: "USER0",
//     time: new Date(1687477032),
//     community_name: "Community Name",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas diam. Vehicula ipsum a arcu cursus. Odio pellentesque diam volutpat commodo sed egestas egestas. ",
//     likes: 10,
//     comments: [
//       {
//         username: "USer1",
//         comment: "This is good",
//         upvote: 20,
//         downvote: 1,
//       },
//       {
//         username: "USer2",
//         comment: "This is okay",
//         upvote: 22,
//         downvote: 6,
//       },
//     ],
//   },
//   {
//     username: "USER9",
//     time: new Date(1687433032),
//     community_name: "Community Name",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas diam. Vehicula ipsum a arcu cursus. Odio pellentesque diam volutpat commodo sed egestas egestas. ",
//     likes: 10,
//     comments: [
//       {
//         username: "USer1",
//         comment: "This is good",
//         upvote: 20,
//         downvote: 1,
//       },
//       {
//         username: "USer2",
//         comment: "This is okay",
//         upvote: 22,
//         downvote: 6,
//       },
//     ],
//   },
// ];

const Posts = () => {
  const [posts, setPosts] = useState<PostSate>({ items: [] });
  async function getPosts() {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => MapToPosts(result))
      .catch((error) => console.log("error", error));
  }
  async function MapToPosts(results: any) {
    results.map((item: any) => {
      var post: post = {
        id: item.id,
        username: item.table_name.name,
        user_id: item.user_id,
        user_image: item.table_name.user_image,
        time: new Date(item.inserted_at),
        community_name: "Community Name",
        content: item.content,
        likes: item.likes,
        dislikes: item.dislikes,
        comment_id: item.comment_id,
        comments: item.comment,
        likes_dislikes: item.likes_dislikes,
      };
      setPosts((prevState) => ({
        items: [...prevState.items, post],
      }));
    });
  }
  useEffect(() => {
    getPosts();
  }, []);
  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);
  return (
    <div className="mx-14 py-10 w-2/3">
      <CreatePost setPosts={setPosts} />
      <div className="mt-8 flex flex-col gap-8">
        {posts.items.map((post) => (
          <Post item={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;