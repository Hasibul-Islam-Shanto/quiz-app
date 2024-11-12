import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios.config";

const getQuiz = async (id) => {
  try {
    const response = await axios.get(`/quizzes/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error on getting quiz - ", error);
    throw new Error(error);
  }
};
const useGetQuiz = (id) => {
  return useQuery({
    queryKey: ["getQuizset", id],
    queryFn: () => getQuiz(id),
  });
};

export default useGetQuiz;
