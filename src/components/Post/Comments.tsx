import React, { useState, useEffect, useContext } from "react";
import comment from "../../interfaces/comment";
import Comment from "./Comment";
import { getImageSigned } from "../../utils/basicsetup";
import { UserDataContext } from "../../context";
interface Props {
  item: Array<comment>;
  post_id: number;
  comment_id: Array<number>;
  user_id: string;
  user_image: string;
}
interface Comments {
  item: Array<comment>;
}

const Comments = ({
  item,
  post_id,
  comment_id,
  user_id,
  user_image,
}: Props) => {
  const [comments, setComments] = useState<Comments>({ item: item });
  const [newComment, setNewComment] = useState<string>("");
  const { user_data, setUserData } = useContext(UserDataContext);
  const addComment = async () => {
    var commenttemp: comment = {
      id: 0,
      comment_content: newComment,
      upvote: 0,
      downvote: 0,
      users: {
        name: user_data.name,
        user_image: user_data.user_image,
      },
      upvotes_downvotes: [
        {
          user_id: 0,
          value: 0,
          id: 0,
        },
      ],
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: newComment,
      user_id: 1,
      post_id: post_id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/comment`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        commenttemp.id = parseInt(result);
        console.log("CCC", commenttemp, user_data);
        setComments((prevState) => ({
          item: [commenttemp, ...prevState.item],
        }));
      })
      .catch((error) => console.log("error", error));

    setNewComment("");
  };
  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <div>
      <div className="flex gap-4 mt-6">
        <div className="h-8 w-8 rounded-full bg-teal-100 overflow-hidden">
          <img src={user_image} className="h-full w-full" />
        </div>
        <input
          className="px-4 py-1 w-full rounded-xl bg-[#343440]"
          placeholder="What's on your mind?"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="hover:bg-[#343440] transition py-1 px-2 rounded-xl text-sm flex justify-center items-center"
          onClick={addComment}
        >
          Add
        </button>
      </div>
      <div className="mt-4">
        <div>Comments</div>
        <div className="w-full mt-2">
          {comments.item.map((element) => (
            <Comment item={element} user_id={user_id} key={element.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
