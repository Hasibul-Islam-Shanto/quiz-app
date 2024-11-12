/* eslint-disable react/prop-types */
import { useState } from "react";
import { UserContext } from "../context";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo;
  });
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
