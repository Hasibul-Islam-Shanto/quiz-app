import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";

const submitQuizAnswer = async (data) => {
  const response = await axios.post(`/quizzes/${data.id}/attempt`, {
    answers: data.answers,
  });
  return response.data;
};

const useSubmitQuizAnswer = (id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submitQuizAnswer,
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      navigate(`/result/${id}`);
    },
  });
};

export default useSubmitQuizAnswer;
