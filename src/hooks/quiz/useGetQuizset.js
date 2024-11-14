import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios.config";
const getQuizset = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error on getting quiz sets - ", error);
    throw new Error(error);
  }
};
const useGetQuizset = (url) => {
  return useQuery({
    queryKey: ["getQuizset", url],
    queryFn: () => getQuizset(url),
  });
};

export default useGetQuizset;
