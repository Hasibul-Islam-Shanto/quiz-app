import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";

const signIn = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

const useSignIn = (isAdmin) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  return useMutation({
    mutationFn: signIn,
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("🚀 ~ useSignIn ~ data:", data);
      localStorage.setItem("accessToken", data?.data?.tokens?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.tokens?.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(data?.data?.user));
      setUser(data?.data?.user);
      if (isAdmin && data?.data?.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
  });
};

export default useSignIn;
