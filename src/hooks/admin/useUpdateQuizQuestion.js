import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import useCustomToast from "../useCustomToast";

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
  const { toastSuccess, toastError } = useCustomToast();
  return useMutation({
    mutationFn: updateQuizQuestion,
    retry: 0,
    onError: (error) => {
      toastError("Unable to edit Question!");
      console.log(error);
    },
    onSuccess: () => {
      toastSuccess("Question edited Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
    },
  });
};

export default useUpdateQuizQuestion;
