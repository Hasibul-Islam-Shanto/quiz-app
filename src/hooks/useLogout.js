import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { useQueryClient } from "@tanstack/react-query";


const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const handleLogout = () => {
    window.localStorage.setItem("accessToken", null);
    window.localStorage.setItem("userInfo", null);
    setUser(null);
    queryClient.clear();
    navigate("/login");
  };
  return { handleLogout };
};

export default useLogout;
