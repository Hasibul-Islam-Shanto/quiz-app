import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";

const deleteQuestion = async (id) => {
  const response = await axios.delete(`/admin/questions/${id}`);
  return response.data;
};

const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteQuestion(id),
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useDeleteQuestion;
