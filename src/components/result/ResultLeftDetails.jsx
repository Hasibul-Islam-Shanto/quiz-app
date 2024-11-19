/* eslint-disable react/prop-types */
import { calculateScores } from "../../services/helper";
import { Link } from "react-router-dom";
import PercentageChart from "../ui/PercentageChart";

const ResultLeftDetails = ({ quiz, correctAnswers, submittedAnswers }) => {
  const { correctCount, wrongCount, totalMarks } = calculateScores(
    correctAnswers,
    submittedAnswers
  );

  return (
    <>
      <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
        <div>
          <div className="text-white">
            <div>
              <h2 className="text-4xl font-bold mb-2">{quiz?.title}</h2>
              <p>{quiz?.description}</p>
            </div>

            <div className="my-6 flex items-center  ">
              <div className="w-1/2">
                <div className="flex gap-6 my-6">
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {quiz?.stats?.total_questions}
                    </p>
                    <p className="text-gray-300">Questions</p>
                  </div>

                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {correctCount}
                    </p>
                    <p className="text-gray-300">Correct</p>
                  </div>

                  <div>
                    <p className="font-semibold text-2xl my-0">{wrongCount}</p>
                    <p className="text-gray-300">Wrong</p>
                  </div>
                </div>

                <Link
                  to={`/leaderboard/${quiz?.id}`}
                  className=" bg-secondary py-3 rounded-md text-lg font-medium underline text-white"
                >
                  View Leaderboard
                </Link>
              </div>

              <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {totalMarks}/{quiz?.stats?.total_marks}
                  </p>
                  <p>Your Mark</p>
                </div>
                <div>
                  <PercentageChart
                    marks={totalMarks}
                    totalMarks={quiz?.stats?.total_marks}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultLeftDetails;
