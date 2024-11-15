import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";

const updateQuizQuestion = async (data) => {
  const response = await axios.patch(`/admin/questions/${data.id}`, {
    question: data.question,
    options: data.options,
    correctAnswer: data.correctAnswer,
  });
  return response.data;
};

const useUpdateQuizQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuizQuestion,
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
    },
  });
};

export default useUpdateQuizQuestion;
