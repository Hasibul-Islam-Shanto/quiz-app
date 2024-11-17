import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../useCustomToast";

const updateQuizset = async (data) => {
  const response = await axios.patch(`/admin/quizzes/${data.id}`, {
    status: data.status,
  });
  return response.data;
};

const useUpdateQuizset = () => {
  const queryClient = useQueryClient();
  const navigare = useNavigate();
  const { toastSuccess, toastError } = useCustomToast();
  return useMutation({
    mutationFn: updateQuizset,
    retry: 0,
    onError: (error) => {
      toastError("Unable to publish the Quiz!");
      console.log(error);
    },
    onSuccess: () => {
      toastSuccess("Quiz Published Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
      navigare("/admin/dashboard");
    },
  });
};

export default useUpdateQuizset;
