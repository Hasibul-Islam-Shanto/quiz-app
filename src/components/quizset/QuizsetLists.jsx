/* eslint-disable react/prop-types */
import QuizsetCard from "./QuizsetCard";

const QuizsetLists = ({ quizLists }) => {
  return (
    <>
      <main className="bg-white p-6 rounded-md h-full">
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizLists.length > 0 &&
              quizLists?.map((item) => (
                <QuizsetCard key={item.id} quiz={item} />
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default QuizsetLists;
