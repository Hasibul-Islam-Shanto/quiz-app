import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/admin-panel/Sidebar";
import useGetQuizset from "../hooks/quiz/useGetQuizset";
import { useMemo, useState } from "react";
import Loader from "../components/ui/Loader";
import QuizEntryQuestionInput from "../components/admin-panel/QuizEntryQuestionInput";
import { FormProvider, useForm } from "react-hook-form";
import QuizEntryQuestions from "../components/admin-panel/QuizEntryQuestions";

const QuizEntryPage = () => {
  const { id } = useParams();
  const [isEditTriggered, setIsEditTriggered] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const methods = useForm({ mode: "all" });

  const { data: quizset, isLoading } = useGetQuizset("/admin/quizzes");

  const singleQuizset = useMemo(() => {
    const quizsets = quizset && quizset?.filter((item) => item.id === id);
    if (quizsets && quizsets.length > 0) {
      return quizsets[0];
    } else {
      return [];
    }
  }, [id, quizset]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-[#F5F3FF] min-h-screen flex">
        <Sidebar />

        <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to={"/admin/dashboard"}
                    className="text-gray-600 hover:text-buzzr-purple"
                  >
                    Home
                  </Link>
                  <svg
                    className="fill-current w-3 h-3 mx-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li>
                  <Link
                    to={`/admin/quizentry/${id}`}
                    className="text-gray-600 hover:text-buzzr-purple"
                    aria-current="page"
                  >
                    Quizzes
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
              <FormProvider {...methods}>
                {singleQuizset.status !== "published" && (
                  <QuizEntryQuestionInput
                    singleQuizset={singleQuizset}
                    setIsEditTriggered={setIsEditTriggered}
                    isEditTriggered={isEditTriggered}
                    selectedId={selectedId}
                  />
                )}

                <QuizEntryQuestions
                  singleQuizset={singleQuizset}
                  questions={singleQuizset?.Questions ?? []}
                  setIsEditTriggered={setIsEditTriggered}
                  setSelectedId={setSelectedId}
                />
              </FormProvider>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuizEntryPage;
