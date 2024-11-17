import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import useCustomToast from "../useCustomToast";

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
  const { toastSuccess, toastError } = useCustomToast();
  return useMutation({
    mutationFn: addQuizQuestion,
    retry: 0,
    onError: (error) => {
      console.log(error);
      toastError("Unable to add question!");
    },
    onSuccess: () => {
      toastSuccess("Question added Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
    },
  });
};

export default useAddQuizQuestion;
