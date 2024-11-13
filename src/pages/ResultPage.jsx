import { Link, useParams } from "react-router-dom";
import logowhite from "../assets/logo-white.svg";
import ResultLeftDetails from "../components/result/ResultLeftDetails";
import ResultRightDetails from "../components/result/ResultRightDetails";
import useGetAttemptsList from "../hooks/quiz/useGetAttemptsList";
import Loader from "../components/ui/Loader";
import useGetQuiz from "../hooks/quiz/useGetQuiz";
import { useContext, useMemo } from "react";
import { UserContext } from "../context";

const ResultPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const { data: attemptsList, isLoading: isGettingAttempList } =
    useGetAttemptsList(id);

  const { data: quizDetails, isLoading: isGettingQuizDetails } = useGetQuiz(id);

  const loggedInUserAttempt = useMemo(() => {
    const attempt =
      attemptsList?.data?.attempts?.length > 0 &&
      attemptsList?.data?.attempts?.filter((item) => {
        return item?.user?.id === user.id;
      });
    return attempt[0];
  }, [attemptsList?.data?.attempts, user.id]);

  if (isGettingAttempList || isGettingQuizDetails) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <div className="flex min-h-screen overflow-hidden">
          <Link to={"/"}>
            <img src={logowhite} className="max-h-11 fixed left-6 top-6 z-50" />
          </Link>

          <ResultLeftDetails
            quiz={quizDetails?.data}
            correctAnswers={loggedInUserAttempt?.correct_answers}
            submittedAnswers={loggedInUserAttempt?.submitted_answers}
          />
          <ResultRightDetails
            quiz={quizDetails?.data}
            attempt={loggedInUserAttempt}
          />
        </div>
      </div>
    </>
  );
};

export default ResultPage;
