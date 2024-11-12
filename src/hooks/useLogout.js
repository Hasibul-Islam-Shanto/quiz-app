import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";

const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleLogout = () => {
    window.localStorage.setItem("accessToken", null);
    window.localStorage.setItem("userInfo", null);
    setUser(null);
    navigate("/login");
  };
  return { handleLogout };
};

export default useLogout;
