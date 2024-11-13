import Header from "../components/Header";
import avater from "../assets/user_avatar.png";
import { useParams } from "react-router-dom";
import useGetAttemptsList from "../hooks/quiz/useGetAttemptsList";
import { useContext, useMemo } from "react";
import Loader from "../components/ui/Loader";
import otherUserAvater from "../assets/avater.webp";
import { UserContext } from "../context";
import { calculateScores } from "../services/helper";

const positions = ["1st", "2nd", "3rd"];
const LeaderBoardPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

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

  const loggedInUserAttempt = useMemo(() => {
    const attempt =
      attemptsList?.data?.attempts?.length > 0 &&
      attemptsList?.data?.attempts?.filter((item) => {
        return item?.user?.id === user.id;
      });
    return attempt[0];
  }, [attemptsList?.data?.attempts, user.id]);

  const { correctCount, wrongCount, totalMarks } = calculateScores(
    loggedInUserAttempt?.correct_answers,
    loggedInUserAttempt?.submitted_answers
  );

  const loggedInUserRank =
    processAttempts &&
    processAttempts?.findIndex((item) => item.userId === user.id);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-[#F5F3FF]  p-4">
        <Header />

        <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary rounded-lg p-6 text-white">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={avater}
                    alt="Profile Pic"
                    className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                  />
                  <h2 className="text-2xl font-bold">{user.full_name}</h2>
                  <p className="text-xl">
                    {loggedInUserRank < 3
                      ? positions[loggedInUserRank]
                      : loggedInUserRank + 1 + "th"}{" "}
                    Position
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm opacity-75">Mark</p>
                    <p className="text-2xl font-bold">{totalMarks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-75">Correct</p>
                    <p className="text-2xl font-bold">{correctCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-75">Wrong</p>
                    <p className="text-2xl font-bold">{wrongCount}</p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold">Leaderboard</h1>
                <p className="mb-6">{quizDetails?.title}</p>
                <ul className="space-y-4">
                  {processAttempts &&
                    processAttempts?.slice(0, 5)?.map((item, index) => (
                      <li
                        key={item.id}
                        className={`flex items-center justify-between ${
                          item.userId === user.id && "bg-gray-200 rounded-lg"
                        }`}
                      >
                        <div className="flex items-center">
                          <img
                            src={otherUserAvater}
                            alt="SPD Smith"
                            className="object-cover w-10 h-10 rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-semibold">{item.fullName}</h3>
                            <p className="text-sm text-gray-500">
                              {index < 3 ? positions[index] : index + 1 + "th"}
                              {/* {positions[index]} */}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">{item.totalMarks}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LeaderBoardPage;
