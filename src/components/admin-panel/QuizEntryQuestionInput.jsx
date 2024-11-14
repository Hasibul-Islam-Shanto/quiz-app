import { useFormContext } from "react-hook-form";
import OptionField from "./Option";
import { useParams } from "react-router-dom";
import useAddQuizQuestion from "../../hooks/admin/useAddQuizQuestion";

/* eslint-disable react/prop-types */
const QuizEntryQuestionInput = ({ singleQuizset }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  const { mutate: addQuizQuestion } = useAddQuizQuestion();

  const handleAnswer = (event) => {
    const { value } = event.target;
    setValue("correctAnswer", value);
    setError("correctAnswer", null);
  };

  const onSubmit = (data) => {
    const submittedData = {
      id,
      question: data.question,
      options: [data.option1, data.option2, data.option3, data.option4],
      correctAnswer: data.correctAnswer,
    };
    addQuizQuestion(submittedData);
    reset();
  };

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-bold mb-4">{singleQuizset.title}</h2>
        <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
          Total number of questions :{" "}
          {singleQuizset.Questions && singleQuizset.Questions.length}
        </div>
        <p className="text-gray-600 mb-4">{singleQuizset.description}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Question Title
            </label>
            {errors.question && (
              <p className="text-xs text-red-500 mb-1 ml-1">
                {errors.question.message}
              </p>
            )}
            <input
              {...register("question", {
                required: "Quiz's question is required",
              })}
              type="text"
              className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
              placeholder="Enter quiz title"
            />
          </div>

          <p className="text-sm text-gray-600 mt-4">Add Options</p>
          <p className="text-xs text-red-500 mb-1 ml-1">
            {errors.correctAnswer && errors.correctAnswer.message}
          </p>
          <div id="optionsContainer" className="space-y-2 mt-4">
            <OptionField
              {...register("option1", { required: "Must have an option" })}
              type="text"
              label="Option 1"
              placeholder="Option 1"
              value={watch("option1")}
              handleAnswer={handleAnswer}
              errorMessage={errors?.option1?.message}
            />
            <OptionField
              {...register("option2", { required: "Must have an option" })}
              type="text"
              label="Option 2"
              placeholder="Option 2"
              value={watch("option2")}
              handleAnswer={handleAnswer}
              errorMessage={errors?.option2?.message}
            />
            <OptionField
              {...register("option3", { required: "Must have an option" })}
              type="text"
              label="Option 3"
              placeholder="Option 3"
              value={watch("option3")}
              handleAnswer={handleAnswer}
              errorMessage={errors?.option3?.message}
            />
            <OptionField
              {...register("option4", { required: "Must have an option" })}
              type="text"
              label="Option 4"
              placeholder="Option 4"
              value={watch("option4")}
              handleAnswer={handleAnswer}
              errorMessage={errors?.option4?.message}
            />
            <input
              type="hidden"
              {...register("correctAnswer", {
                required: "Please select a correct answer",
              })}
            />
          </div>
          <div className="flex items-center gap-10">
            <button
              type="submit"
              className="w-full bg-white border-[1px] border-gray-400 text-black text-primary-foreground p-2 rounded-md hover:bg-green-100 transition-colors"
            >
              Add Question
            </button>
            <button
              type="button"
              className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuizEntryQuestionInput;
