import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Navbar";
import { FaUserFriends } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Drawer from "../Drawer/drawer";
import { UserDataContext } from "../../context";
import { Link, useLocation } from "react-router-dom";
import { getUserData } from "../../utils/basicsetup";

const Profile = () => {
  const location = useLocation();
  const { user_id, mode } = location.state;
  const [drawer, showDrawer] = useState(-300);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { user_data, setUserData } = useContext(UserDataContext);
  const [name, setName] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [socials, setSocials] = useState<string>("");
  const [userProfile, setUserProfile] = useState(mode);
  const setFriend = async () => {
    let friend_details = await getUserData(user_id);
    setName(friend_details.name);
    setSocials(friend_details.socials);
    setInterests(friend_details.interests);
    setImageUrl(friend_details.user_image_link);
  };

  const addFriend = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      friend1: user_data.id,
      friend2: user_id,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/friend", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (user_data && mode == 0) {
      setUserProfile(0);
      console.log(user_data);
      setName(user_data.name);
      setSocials(user_data.socials);
      setInterests(user_data.interests);
      setImageUrl(user_data.user_image_link);
    } else if (mode == 1) {
      setFriend();
      setUserProfile(1);
    }
  }, [user_data, user_id]);
  return (
    <div>
      <div className="border-l h-full border-[#8d8e92] flex-col flex justify-center  w-full bg-[#17181c]">
        <NavBar
          showDrawer={showDrawer}
          drawer={drawer}
          icon={<FaUserFriends className="sm:h-6 sm:w-6 h-4 w-4" />}
          name="Profile"
        />
        {isTabletOrMobile ? (
          <motion.div className="text-white absolute" animate={{ x: drawer }}>
            <Drawer />
          </motion.div>
        ) : (
          <></>
        )}
        <div className="h-[497px] hide_scroll overflow-scroll">
          <div className="flex flex-col justify-center items-center gap-10 bg-[#17181c] h-[509px] text-white">
            <div className="-mb-6 flex justify-center flex-col items-center">
              <div className="border h-24 w-24 sm:h-32 sm:w-32 flex flex-col justify-center items-center overflow-hidden rounded-full">
                <img src={imageUrl} className="h-24 w-24 sm:h-36 sm:w-36" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="">Name :</div>
              <div>{name}</div>
            </div>
            <div className="flex gap-4">
              <div className="">Interests :</div>
              <div>{interests}</div>
            </div>
            <div className="flex gap-4">
              <div className="">Socials :</div>
              <div>{socials}</div>
            </div>
            {userProfile == 1 ? (
              <div className="text-sm flex">
                <button
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-white transition"
                  onClick={addFriend}
                >
                  Add Friend
                </button>
              </div>
            ) : (
              <div className="text-sm flex">
                <Link to="/app/editprofile">
                  <div className="bg-[#26272e] px-4 py-2 rounded-xl text-sm transition hover:bg-white hover:text-[#26272e]">
                    Edit Profile
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
