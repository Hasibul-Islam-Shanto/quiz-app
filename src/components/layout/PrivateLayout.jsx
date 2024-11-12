import { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const { user } = useContext(UserContext);
  return <>{!user ? <Navigate to="/login" /> : <Outlet />}</>;
};

export default PrivateLayout;
