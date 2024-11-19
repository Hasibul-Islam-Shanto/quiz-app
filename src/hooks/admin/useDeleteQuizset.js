import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import useCustomToast from "../useCustomToast";
import { useNavigate } from "react-router-dom";

const deleteQuizset = async (id) => {
  const response = await axios.delete(`/admin/quizzes/${id}`);
  return response.data;
};

const useDeleteQuizset = () => {
  const queryClient = useQueryClient();
  const { toastError, toastSuccess } = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => deleteQuizset(id),
    retry: 0,
    onSuccess: () => {
      toastSuccess("Quiz deleted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getQuizset", "/admin/quizzes"],
      });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toastError("Unable to delete Quiz!");
      console.log(error);
    },
  });
};

export default useDeleteQuizset;
