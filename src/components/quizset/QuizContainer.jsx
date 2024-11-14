import useGetQuizset from "../../hooks/quiz/useGetQuizset";
import Loader from "../ui/Loader";
import QuizsetLists from "./QuizsetLists";

const QuizContainer = () => {
  const {
    data: quizsetList,
    isLoading,
    isError,
    error,
  } = useGetQuizset("/quizzes");

  let content;

  if (isLoading && !isError) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = (
      <div className="w-full flex justify-center text-red-400 font-bold text-lg">
        {error.message}
      </div>
    );
  } else if (!isLoading && !isError && quizsetList?.data?.length === 0) {
    content = (
      <div className="w-full flex justify-center items-center text-xl font-bold">
        There is no quizes!
      </div>
    );
  } else if (!isLoading && !isError && quizsetList?.data?.length !== 0) {
    content = <QuizsetLists quizLists={quizsetList?.data ?? []} />;
  }

  return <>{content}</>;
};

export default QuizContainer;
