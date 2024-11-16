/* eslint-disable react/prop-types */

import { useCallback, useMemo, useState } from "react";
import useSubmitQuizAnswer from "../../hooks/quiz/useSubmitQuizAnswer";

const QuizQuestion = ({ quiz, answers, setAnswers }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = quiz?.questions;
  const { mutate: submitQuizAnswer } = useSubmitQuizAnswer(quiz?.id);

  const handleNextIndex = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousIndex = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleChange = (e) => {
    const { value } = e.target;
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: value,
    });
  };

  const handleSubmit = () => {
    const submittedData = {
      id: quiz?.id,
      answers,
    };
    submitQuizAnswer(submittedData);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledOptions = useMemo(() => {
    return questions.map((question) => ({
      questionId: question.id,
      options: shuffleArray(question.options),
    }));
  }, [questions]);

  const getCurrentShuffledOptions = useCallback(() => {
    return (
      shuffledOptions.find(
        (q) => q.questionId === questions[currentQuestionIndex].id
      )?.options || []
    );
  }, [shuffledOptions, currentQuestionIndex, questions]);

  return (
    <>
      <div className="lg:col-span-2 bg-white">
        <div className="bg-white p-6 !pb-2 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">
              {currentQuestion.question}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {getCurrentShuffledOptions().map((item, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
              >
                <input
                  type="checkbox"
                  value={item}
                  onChange={handleChange}
                  checked={Object.values(answers).includes(item) ? true : false}
                  className="form-radio text-buzzr-purple"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-10">
            {currentQuestionIndex > 0 && (
              <button
                type="button"
                onClick={handlePreviousIndex}
                className="w-1/2 text-center ml-auto block bg-white border-[1px] border-gray-400 text-black py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
              >
                Previous
              </button>
            )}

            {currentQuestionIndex !== questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNextIndex}
                className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8 disabled:bg-gray-300"
                disabled={
                  Object.keys(answers).length !== questions.length
                    ? true
                    : false
                }
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizQuestion;
