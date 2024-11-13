import { Link } from "react-router-dom";
import logoWhite from "../../assets/logo-white.svg";
import userAvater from "../../assets/user_avatar.png";

const Sidebar = () => {
  return (
    <>
      <aside className="w-64 bg-primary p-6 flex flex-col">
        <div className="mb-10">
          <img src={logoWhite} alt="logo-white" className="h-7" />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link
                to={"#"}
                className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
              >
                Quizzes
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Settings
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Users
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Roles
              </Link>
            </li>

            <li>
              <Link
                to={"#"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex items-center">
          <img
            src={userAvater}
            alt="Mr Hasan"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-white font-semibold">Saad Hasan</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
