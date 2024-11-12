import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios.config";
const getQuizset = async () => {
  try {
    const response = await axios.get("/quizzes");
    return response.data;
  } catch (error) {
    console.log("Error on getting quiz sets - ", error);
    throw new Error(error);
  }
};
const useGetQuizset = () => {
  return useQuery({
    queryKey: ["getQuizset"],
    queryFn: () => getQuizset(),
  });
};

export default useGetQuizset;
