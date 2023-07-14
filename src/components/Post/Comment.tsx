import React, { useState, useEffect, useContext } from "react";
import comment from "../../interfaces/comment";
import { getImageSigned } from "../../utils/basicsetup";
import { UserDataContext } from "../../context";

interface Props {
  user_id: string;
  item: comment;
}
const Comment = ({ item, user_id }: Props) => {
  const [comment, setComment] = useState<comment>(item);
  const [updownbyuser, setupdownbyuser] = useState<number>(-2);
  const { user_data, setUserData } = useContext(UserDataContext);

  let updown = -2;

  const postUpvoteDownvote = async (prev: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment_id: item.id,
      value: updown,
      user_id: user_id,
      prev: prev,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/upvotesdownvotes`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const toggleUpvoteDownvote = (prev: number) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      comment_id: item.id,
      value: updown,
      user_id: user_id,
      prev: prev,
    });
    var requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BACKEND}/upvotesdownvotes`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const upvote = () => {
    if (updownbyuser == 1) {
      {
        setupdownbyuser(updownbyuser - 1);
        updown = 0;
        setComment((prevState) => ({
          ...prevState,
          upvote: comment.upvote - 1,
        }));
        toggleUpvoteDownvote(1);
      }
    } else if (updownbyuser == -1) {
      setupdownbyuser(1);
      updown = 1;
      setComment((prevState) => ({
        ...prevState,
        downvote: comment.downvote - 1,
      }));
      setComment((prevState) => ({ ...prevState, upvote: comment.upvote + 1 }));
      toggleUpvoteDownvote(-1);
    } else if (updownbyuser == 0) {
      updown = 1;
      setComment((prevState) => ({ ...prevState, upvote: comment.upvote + 1 }));
      setupdownbyuser(1);
      toggleUpvoteDownvote(0);
    } else {
      updown = 1;
      setComment((prevState) => ({ ...prevState, upvote: comment.upvote + 1 }));
      setupdownbyuser(1);
      postUpvoteDownvote(-2);
    }
  };
  const downvote = () => {
    if (updownbyuser == 1) {
      setupdownbyuser(-1);
      updown = -1;
      setComment((prevState) => ({ ...prevState, upvote: comment.upvote - 1 }));
      setComment((prevState) => ({
        ...prevState,
        downvote: comment.downvote + 1,
      }));
      toggleUpvoteDownvote(1);
    } else if (updownbyuser == -1) {
      updown = 0;
      setupdownbyuser(0);
      setComment((prevState) => ({
        ...prevState,
        downvote: comment.downvote - 1,
      }));
      toggleUpvoteDownvote(-1);
    } else if (updownbyuser == 0) {
      updown = -1;
      setComment((prevState) => ({
        ...prevState,
        downvote: comment.downvote + 1,
      }));
      setupdownbyuser(-1);
      toggleUpvoteDownvote(0);
    } else {
      updown = -1;
      setComment((prevState) => ({
        ...prevState,
        downvote: comment.downvote + 1,
      }));
      setupdownbyuser(-1);
      postUpvoteDownvote(-2);
    }
  };
  useEffect(() => {
    let exists = item.upvotes_downvotes.find(
      (obj) => obj.user_id == user_data.id
    );
    if (exists) {
      setupdownbyuser(exists.value);
    }
  }, [item, user_data]);

  useEffect(() => {
    if (item && item.users) getSignedImage(item.users.user_image);
  }, [item]);

  async function getSignedImage(image: string) {
    let signedImage: any = await getImageSigned(image, "UserImages", 6000);
    if (signedImage == undefined) signedImage = "";
    setComment((prev) => ({
      ...prev,
      users: { ...prev.users, user_image: signedImage },
    }));
  }

  return (
    <div className="mt-2 items-center flex gap-4 w-full text-sm">
      <div className="sm:h-6 sm:w-6 h-4 w-4 rounded-full overflow-hidden bg-violet-100">
        <img className="h-full w-full" src={comment.users.user_image} />
      </div>
      <div className="w-full sm:text-base text-xs">
        <div className="flex gap-2">
          <div className="font-semibold text-white">{comment.users.name}:</div>
          <div>{comment.comment_content}</div>
        </div>
        <div className="flex text-xs w-full justify-between">
          {/* <div>Reply Comment</div> */}
          <div className="flex">
            <div className="border-r pr-2 flex gap-2">
              <div
                className={`hover:border-[#8d8e92] border-b border-transparent transition cursor-pointer ${
                  updownbyuser == 1 ? "text-green-500" : ""
                }`}
                onClick={upvote}
              >
                Upvotes
              </div>
              <div> {comment.upvote}</div>
            </div>
            <div className="pl-2 flex gap-2">
              <div
                className={`hover:border-[#8d8e92] border-b border-transparent transition cursor-pointer ${
                  updownbyuser == -1 ? "text-red-500" : ""
                }`}
                onClick={downvote}
              >
                Downvotes{" "}
              </div>
              <div>{comment.downvote}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
