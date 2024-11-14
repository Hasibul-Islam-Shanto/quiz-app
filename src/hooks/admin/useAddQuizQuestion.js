import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";

const addQuizQuestion = async (data) => {
  const response = await axios.post(`/admin/quizzes/${data.id}/questions`, {
    question: data.question,
    options: data.options,
    correctAnswer: data.correctAnswer,
  });
  return response.data;
};

const useAddQuizQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addQuizQuestion,
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

export default useAddQuizQuestion;
