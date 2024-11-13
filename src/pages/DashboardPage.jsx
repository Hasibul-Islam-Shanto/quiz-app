import plusSvg from "../assets/plus.svg";
import boxSvg from "../assets/box.svg";
import Sidebar from "../components/Admin/Sidebar";

const DashboardPage = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex">
        <Sidebar />

        <main className="flex-grow p-10">
          <header className="mb-8">
            <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
            <h1 className="text-4xl font-bold">
              Welcome Back To Your Quiz Hub!
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="./quiz_set_page.html" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
                <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                  <img src={plusSvg} alt="plus" className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                  Create a new quiz
                </h3>
                <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                  Build from the ground up
                </p>
              </div>
            </a>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
              <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <img src={boxSvg} alt="box" className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                JavaScript Basics Quiz
              </h3>
              <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                Test knowledge of core JavaScript
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
