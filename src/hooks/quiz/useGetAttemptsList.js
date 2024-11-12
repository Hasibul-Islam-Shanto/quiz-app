import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios.config";

const getAttemptList = async (id) => {
  try {
    const response = await axios.get(`quizzes/${id}/attempts`);
    return response.data;
  } catch (error) {
    console.log("Error on getting quiz sets - ", error);
    throw new Error(error);
  }
};
const useGetAttemptsList = (id) => {
  return useQuery({
    queryKey: ["getQuizset"],
    queryFn: () => getAttemptList(id),
  });
};

export default useGetAttemptsList;
