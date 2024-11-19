import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetAttemptsList from "../../hooks/quiz/useGetAttemptsList";
import Loader from "../ui/Loader";

const AttemptUser = () => {
  const { id } = useParams();

  const { data: attemptsList, isLoading } = useGetAttemptsList(id);
  const quizDetails = attemptsList?.data?.quiz;

  const processAttempts = useMemo(() => {
    return attemptsList?.data?.attempts
      ?.map((item) => {
        let totalMarks = 0;
        item.submitted_answers.forEach((submittedAnswers) => {
          const correctAnswer = item.correct_answers.find(
            (ans) => ans.question_id === submittedAnswers.question_id
          );
          if (
            correctAnswer &&
            submittedAnswers.answer === correctAnswer.answer
          ) {
            totalMarks += correctAnswer.marks;
          }
        });

        return {
          id: item.id,
          fullName: item.user.full_name,
          totalMarks,
          userId: item.user.id,
        };
      })
      .sort((a, b) => b.totalMarks - a.totalMarks);
  }, [attemptsList?.data?.attempts]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="space-y-3 bg-white p-4 rounded-md self-start">
        <div className="space-y-2 pb-5">
          <h3 className="text-2xl font-semibold">{quizDetails?.title}</h3>
          <p className="text-lg font-light">{quizDetails?.description}</p>
        </div>
        {processAttempts &&
          processAttempts?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b-[1px] border-gray-300 p-2"
            >
              <h3 className="text-balance font-semibold">{item.fullName}</h3>
              <p>{item.totalMarks}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default AttemptUser;
