import React, { useEffect } from "react";
import friend from "../../interfaces/friends";
import { getImageSigned } from "../../utils/basicsetup";

interface Props {
  friend: friend;
}
const Friend = ({ friend }: Props) => {
  return (
    <div className={`${friend && friend.user_image ? "w-1/4" : ""}`}>
      {friend && friend.user_image ? (
        <div className="border gap-4 flex justify-center items-center flex-col rounded-xl p-4">
          <div className="rounded-full overflow-hidden h-32 w-32">
            <img className="h-full w-full" src={friend.user_image} />
          </div>
          <div className="text-white">{friend.name}</div>
          <div>
            <div className="hover:text-blue-600 transition cursor-pointer hover:bg-white bg-blue-500 px-2 py-1 rounded-xl text-sm text-white">
              Add Friend
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Friend;
