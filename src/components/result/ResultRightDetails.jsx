/* eslint-disable react/prop-types */
const ResultRightDetails = ({ quiz, attempt }) => {
  const questions = quiz?.questions;
  const corretAnswers = attempt?.correct_answers;
  const submittedAnswers = attempt?.submitted_answers;

  const getCalculatedAnswer = (questionId, answers) => {
    const res = answers?.find((answer) => answer?.question_id === questionId);
    return res ? res.answer : null;
  };

  return (
    <>
      <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
        <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
          <div className="px-4">
            {questions?.map((item) => (
              <div
                key={item.id}
                className="rounded-lg overflow-hidden shadow-sm mb-4"
              >
                <div className="bg-white p-6 !pb-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <h3 className="font-bold">{item.marks}</h3>
                  </div>
                  <div className="space-y-2">
                    {item.options.map((option) => (
                      <label
                        key={option}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                          getCalculatedAnswer(item.id, corretAnswers) === option
                            ? "bg-green-200"
                            : getCalculatedAnswer(item.id, submittedAnswers) ===
                              option
                            ? "bg-red-200"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-x-3">
                          <input
                            type="radio"
                            className="form-radio text-buzzr-purple"
                            checked={
                              getCalculatedAnswer(item.id, submittedAnswers) ===
                              option
                            }
                          />
                          <span>{option}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 px-6 py-2 mt-3">
                  <span className="text-primary hover:text-primary/80 font-bold">
                    Correct Answer :
                  </span>
                  <p>{getCalculatedAnswer(item.id, corretAnswers)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultRightDetails;
