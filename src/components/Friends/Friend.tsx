import React, { useContext, useEffect, useState } from "react";
import friend from "../../interfaces/friends";
import { getImageSigned } from "../../utils/basicsetup";
import { UserDataContext } from "../../context";
import { Link } from "react-router-dom";

interface Props {
  friend: friend;
  isFriend: boolean;
  setFriends: React.Dispatch<React.SetStateAction<Array<friend>>>;
  setRecommendations: React.Dispatch<React.SetStateAction<Array<friend>>>;
}
const Friend = ({
  friend,
  isFriend,
  setFriends,
  setRecommendations,
}: Props) => {
  const { user_data, setUserData } = useContext(UserDataContext);
  const [isFriendState, setIsFriendState] = useState(isFriend);
  const addFriend = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      friend1: user_data.id,
      friend2: friend.id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/friend`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsFriendState((prev: boolean) => !prev);
        setRecommendations((prevState: Array<friend>) => [
          ...prevState,
          friend,
        ]);
        setFriends((prevState: Array<friend>) =>
          prevState.filter((item) => item.id !== friend.id)
        );
      })
      .catch((error) => console.log("error", error));
  };
  const unFriend = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      friend1: user_data.id,
      friend2: friend.id,
    });

    var requestOptions: RequestInit = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/friend`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsFriendState((prev: boolean) => !prev);
        setFriends((prevState: Array<friend>) => [...prevState, friend]);
        setRecommendations((prevState: Array<friend>) =>
          prevState.filter((item) => item.id !== friend.id)
        );
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    setIsFriendState(isFriend);
  }, [isFriend]);
  return (
    <div className={`${friend && friend.name ? "w-1/3 sm:w-1/4" : ""}`}>
      {friend && friend.name ? (
        <div className="border gap-4 flex justify-center items-center flex-col rounded-xl p-4">
          <Link
            to="/app/profile"
            state={{ user_id: friend.id, mode: 1, isFriend: isFriend }}
          >
            <div className="rounded-full overflow-hidden h-20 w-20 sm:h-32 sm:w-32">
              <img className="h-full w-full" src={friend.user_image} />
            </div>
          </Link>
          <div className="sm:text-base text-sm text-white">{friend.name}</div>
          <div>
            {isFriendState === true ? (
              <button
                className="hover:text-blue-600 transition hover:bg-white bg-blue-500 px-2 py-1 rounded-xl text-sm text-white"
                onClick={addFriend}
              >
                Follow
              </button>
            ) : (
              <button
                className="hover:text-red-600 transition hover:bg-white bg-red-500 px-2 py-1 rounded-xl text-sm text-white"
                onClick={unFriend}
              >
                Unfollow
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Friend;
