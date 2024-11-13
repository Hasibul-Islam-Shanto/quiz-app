import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import { UserContext } from "../context";

const Header = () => {
  const { handleLogout } = useLogout();
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/">
        <img src={logo} alt="website-logo" className="h-7" />
      </Link>

      <div className="font-jaro">
        {!user ? (
          <Link
            to={"/login"}
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors "
          >
            Login
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              console.log("Logged Out");
              handleLogout();
            }}
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
