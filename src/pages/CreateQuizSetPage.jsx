import { Link } from "react-router-dom";
import leftArrowSvg from "../assets/leftArrow.svg";
import Sidebar from "../components/admin-panel/Sidebar";
import { useForm } from "react-hook-form";
import InputField from "../components/ui/input";
import useCreateQuizset from "../hooks/admin/useCreateQuizset";

const CreateQuizSetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { mutate: createQuizset } = useCreateQuizset();

  const onSubmit = (data) => {
    createQuizset(data);
  };
  return (
    <>
      <div className="bg-[#F5F3FF] min-h-screen flex">
        <Sidebar />

        <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* <!-- Left Column --> */}
            <div>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
              >
                <img src={leftArrowSvg} alt="Left arrow" className="h-5 w-5" />
                Back to home
              </Link>

              <h2 className="text-3xl font-bold mb-6">
                Give your quiz title and description
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  {...register("title", {
                    required: "Quiz title is required.",
                  })}
                  label="Quiz title"
                  type="text"
                  placeholder="Quiz"
                  errorMessage={errors?.title?.message}
                />

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    {...register("description")}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                    placeholder="Description"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateQuizSetPage;
