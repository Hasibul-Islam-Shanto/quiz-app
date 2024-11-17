import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../useCustomToast";

const signUp = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

const useSignUp = () => {
  const navigate = useNavigate();
  const { toastSuccess } = useCustomToast();

  return useMutation({
    mutationFn: signUp,
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toastSuccess("Register Successful! Please login.");
      navigate("/login");
    },
  });
};

export default useSignUp;
