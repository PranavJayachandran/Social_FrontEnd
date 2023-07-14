import React, { useContext } from "react";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import community from "../../interfaces/community";
import { UserDataContext } from "../../context";
import { useMediaQuery } from "react-responsive";
import { TiThMenu } from "react-icons/ti";

interface Props {
  showDrawer?: (newUserDetails: any) => void;
  drawer: number;
}
const NavBar = ({ showDrawer, drawer }: Props) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const location = useLocation();
  const { user_data, setUserData } = useContext(UserDataContext);
  return (
    <div className=" py-4 sm:px-10 px-4 text-white bg-[#1e1f23] flex w-full justify-between">
      {isTabletOrMobile ? (
        <div className=" flex justify-center items-center">
          <TiThMenu
            onClick={() => {
              if (showDrawer) showDrawer(drawer == 0 ? -300 : 0);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center items-center gap-2">
        <CgCommunity className="sm:h-6 sm:w-6 h-4 w-4" />
        <div className="text-sm sm:text-lg">Community</div>
      </div>
      {!isTabletOrMobile ? (
        <div>
          {(() => {
            switch (location.pathname) {
              case "/app/communityjoined":
                return (
                  <div className="text-[10px] sm:text-xs flex gap-2 sm:gap-4 items-center">
                    <Link to="/app/communityjoined">
                      <div className="bg-[#72728c] text-center  text-white rounded-lg p-2">
                        Joined Communities
                      </div>
                    </Link>
                    <Link to="/app/communityunjoined">
                      <div>Unjoined Communities</div>
                    </Link>
                  </div>
                );
              case "/app/communityunjoined":
                return (
                  <div className="text-xs flex gap-4 items-center">
                    <Link to="/app/communityjoined">
                      <div>Joined Communities</div>
                    </Link>
                    <Link to="/app/communityunjoined">
                      <div className="bg-[#72728c] text-white rounded-lg p-2">
                        Unjoined Communities
                      </div>
                    </Link>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
      ) : (
        <></>
      )}

      <div className="flex sm:gap-4 gap-2 justify-center items-center">
        <AiFillMessage className="sm:h-6 sm:w-6 h-4 w-4" />
        <MdNotifications className="sm:h-6 sm:w-6 h-4 w-4 " />
        <div className="flex sm:gap-4 gap-2 justify-center items-center">
          <div className="sm:text-base text-sm">{user_data.name}</div>
          <Link to="/app/editprofile">
            <div className="sm:h-10 sm:w-10 h-6 w-6 rounded-full flex justify-center items-center bg-blue-100 overflow-hidden">
              <img className="h-full w-full" src={user_data.user_image_link} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
