/* eslint-disable react/prop-types */
const QuizEntryQuestions = ({ questions }) => {
  return (
    <>
      <div className="px-4">
        {questions && questions.length > 0 ? (
          questions.map((item, index) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden shadow-sm mb-4"
            >
              <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {index + 1}
                    {". "}
                    {item.question}
                  </h3>
                </div>
                <div className="space-y-2">
                  {item.options.map((option) => (
                    <label key={option} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={item.correctAnswer === option}
                        readOnly
                        className="form-radio text-buzzr-purple"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Edit Question
                </button>
              </div>
            </div>
          ))
        ) : (
          <span>No questions available now.</span>
        )}
      </div>
    </>
  );
};

export default QuizEntryQuestions;
