import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axios.config";
import { useNavigate } from "react-router-dom";

const createQuizSet = async (data) => {
  const response = await axios.post("/admin/quizzes", data);
  return response.data;
};

const useCreateQuizset = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createQuizSet,
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("🚀 ~ useCreateQuizset ~ data:", data);
      navigate(`/admin/quizentry/${data?.data?.id}`);
    },
  });
};
export default useCreateQuizset;
