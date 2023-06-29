import React, { useState, useEffect } from "react";
import comment from "../../interfaces/comment";
interface Props {
  item: Array<comment>;
  post_id: number;
  comment_id: Array<number>;
}
interface Comments {
  item: Array<comment>;
}

const Comments = ({ item, post_id, comment_id }: Props) => {
  const [comments, setComments] = useState<Comments>({ item: item });
  const [newComment, setNewComment] = useState<string>("");
  const addCommentToPost = async (result: any) => {
    let comments = comment_id;
    comments.unshift(parseInt(result));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment_id: comments,
      post_id: post_id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/commenttopost", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const addComment = async () => {
    console.log(newComment);
    var commenttemp: comment = {
      id: 0,
      username: "Oliver",
      comment_content: newComment,
      upvotes: 0,
      downvotes: 0,
      user_image: "",
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: newComment,
      user_id: 1,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/comment", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        commenttemp.id = parseInt(result);
        addCommentToPost(result);
      })
      .catch((error) => console.log("error", error));
    setComments((prevState) => ({ item: [commenttemp, ...prevState.item] }));
    setNewComment("");
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div>
      <div className="flex gap-4 mt-6">
        <div className="h-8 w-8 rounded-full bg-teal-100"></div>
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
            <div className="mt-2 items-center flex gap-4 w-full text-sm">
              <div className="h-6 w-6 rounded-full overflow-hidden bg-violet-100">
                <img src={element.user_image} />
              </div>
              <div className="w-full">
                <div className="flex gap-2">
                  <div className="font-semibold text-white">
                    {element.username}:
                  </div>
                  <div>{element.comment_content}</div>
                </div>
                <div className="flex text-xs w-full justify-between">
                  {/* <div>Reply Comment</div> */}
                  <div className="flex">
                    <div className="border-r pr-2">
                      Upvotes {element.upvotes}
                    </div>
                    <div className="pl-2">Downvotes {element.downvotes}</div>
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

export default Comments;
