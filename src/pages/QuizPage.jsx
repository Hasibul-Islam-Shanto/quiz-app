import { Navigate, useParams } from "react-router-dom";
import useGetQuiz from "../hooks/quiz/useGetQuiz";
import QuizDetails from "../components/quiz/QuizDetails";
import QuizQuestion from "../components/quiz/QuizQuestion";
import Loader from "../components/ui/Loader";
import { useContext } from "react";
import { UserContext } from "../context";

const QuizPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const { data: quizDetails, isLoading, isError } = useGetQuiz(id);

  if (!user) {
    <Navigate to={"/login"} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Navigate to={"/"} />;
  }
  if (quizDetails?.data?.user_attempt?.attempted) {
    return <Navigate to={`/result/${quizDetails?.data?.id}`} />;
  }
  return (
    <>
      <div className="bg-[#F5F3FF] min-h-screen">
        <div className="container mx-auto py-3">
          <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
              <QuizDetails quiz={quizDetails?.data ?? []} />
              <QuizQuestion quiz={quizDetails?.data ?? []} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
