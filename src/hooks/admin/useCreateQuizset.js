import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../useCustomToast";

const createQuizSet = async (data) => {
  const response = await axios.post("/admin/quizzes", data);
  return response.data;
};

const useCreateQuizset = () => {
  const navigate = useNavigate();
  const { toastError, toastSuccess } = useCustomToast();
  return useMutation({
    mutationFn: createQuizSet,
    retry: 0,
    onError: (error) => {
      toastError("Unable to create Quiz!");
      console.log(error);
    },
    onSuccess: (data) => {
      toastSuccess("Quiz Created Successfully!");
      navigate(`/admin/quizentry/${data?.data?.id}`);
    },
  });
};
export default useCreateQuizset;
