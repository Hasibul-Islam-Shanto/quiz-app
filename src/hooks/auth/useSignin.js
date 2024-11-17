import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import useCustomToast from "../useCustomToast";

const signIn = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

const useSignIn = (isAdmin) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { toastSuccess, toastError } = useCustomToast();

  return useMutation({
    mutationFn: signIn,
    retry: 0,
    onError: (error) => {
      toastError(error.response.data.message);
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data?.data?.tokens?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.tokens?.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(data?.data?.user));
      setUser(data?.data?.user);
      toastSuccess("Login Successful!");
      if (isAdmin && data?.data?.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
  });
};

export default useSignIn;
