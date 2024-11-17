import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../useCustomToast";

const submitQuizAnswer = async (data) => {
  const response = await axios.post(`/quizzes/${data.id}/attempt`, {
    answers: data.answers,
  });
  return response.data;
};

const useSubmitQuizAnswer = (id) => {
  const navigate = useNavigate();
  const { toastError, toastSuccess } = useCustomToast();

  return useMutation({
    mutationFn: submitQuizAnswer,
    retry: 0,
    onError: (error) => {
      console.log("Error occured on quiz submission - ", error);
      toastError("Quiz submission failed!");
    },
    onSuccess: () => {
      toastSuccess("Quiz submit successful!");
      navigate(`/result/${id}`);
    },
  });
};

export default useSubmitQuizAnswer;
