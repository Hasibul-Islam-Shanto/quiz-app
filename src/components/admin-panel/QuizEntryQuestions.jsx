/* eslint-disable react/prop-types */

import { useFormContext } from "react-hook-form";
import useDeleteQuestion from "../../hooks/admin/useDeleteQuestion";
import Spinner from "../ui/Spinner";

const QuizEntryQuestions = ({
  singleQuizset,
  questions,
  setIsEditTriggered,
  setSelectedId,
}) => {
  const { setValue, reset } = useFormContext();
  const { mutate: deleteQuestion, isPending } = useDeleteQuestion();
  console.log(questions);
  const handleEditQuestion = (id) => {
    const selectedItem = questions.find((item) => item.id === id);
    setValue("question", selectedItem.question);
    selectedItem.options.map((item, index) => {
      return setValue(`option${index + 1}`, item);
    });
    setValue("correctAnswer", selectedItem.correctAnswer);
  };
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
                        checked={item?.correctAnswer === option}
                        readOnly
                        className="form-radio text-buzzr-purple"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {singleQuizset.status !== "published" && (
                <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                  <button
                    disabled={isPending}
                    onClick={() => {
                      deleteQuestion(item.id);
                      reset();
                    }}
                    className="text-red-600 hover:text-red-800 font-medium flex"
                  >
                    {isPending ? <Spinner /> : "Delete"}
                  </button>
                  <button
                    onClick={() => {
                      handleEditQuestion(item.id);
                      setIsEditTriggered(true);
                      setSelectedId(item.id);
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Edit Question
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <span className="text-gray-600 text-center text-xl font-semibold">
            No questions available now.
          </span>
        )}
      </div>
    </>
  );
};

export default QuizEntryQuestions;
