import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";

const updateQuizset = async (data) => {
  const response = await axios.patch(`/admin/quizzes/${data.id}`, {
    status: data.status,
  });
  return response.data;
};

const useUpdateQuizset = () => {
  const queryClient = useQueryClient();
  const navigare = useNavigate();
  return useMutation({
    mutationFn: updateQuizset,
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
      navigare("/admin/dashboard");
    },
  });
};

export default useUpdateQuizset;
