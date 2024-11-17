import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import useCustomToast from "../useCustomToast";

const deleteQuestion = async (id) => {
  const response = await axios.delete(`/admin/questions/${id}`);
  return response.data;
};

const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const { toastError, toastSuccess } = useCustomToast();
  return useMutation({
    mutationFn: (id) => deleteQuestion(id),
    retry: 0,
    onSuccess: () => {
      toastSuccess("Question deleted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
    },
    onError: (error) => {
      toastError("Unable to delete Question!");
      console.log(error);
    },
  });
};

export default useDeleteQuestion;
