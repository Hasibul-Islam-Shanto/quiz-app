import { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useContext(UserContext);
  return <>{user ? <Navigate to="/" /> : <Outlet />}</>;
};

export default PublicRoute;
