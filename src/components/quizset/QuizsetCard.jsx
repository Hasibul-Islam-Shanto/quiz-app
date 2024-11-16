/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import card1 from "../../assets/backgrounds/3.jpg";

const QuizsetCard = ({ quiz }) => {
  console.log("🚀 ~ QuizsetCard ~ quiz:", quiz);

  return (
    <>
      <Link
        to={`/quiz/${quiz.id}`}
        className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
      >
        <div className="w-full group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 p-4 flex flex-col items-center">
          <h1 className="text-4xl">{quiz.title}</h1>
          <p className="mt-2 text-lg">{quiz.description} </p>
        </div>
        <div
          className={`absolute ${
            quiz.is_attempted ? "group-hover:flex hidden" : "hidden"
          } transition-all bg-black/80 w-full h-full left-0 top-0 text-white place-items-center items-center justify-center`}
        >
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-bold">Already Participated</h1>
            <p className="text-center">Click to view your leaderboard</p>
          </div>
        </div>
        <img
          src={card1}
          alt="JavaScript Hoisting"
          // className="w-full h-full object-cover rounded mb-4"
        />
      </Link>
    </>
  );
};

export default QuizsetCard;
