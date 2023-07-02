import { createContext } from "react";

interface UserDataContext {
  user_data: any;
  setUserData?: (newUserDetails: any) => void;
}
const user_data = {
  user_data: {},
  setUserData: (data: any) => console.log(data),
};

export const UserDataContext = createContext<UserDataContext>(user_data);
