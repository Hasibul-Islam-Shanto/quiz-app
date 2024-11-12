import { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const { user } = useContext(UserContext);
  return <>{user ? <Navigate to="/" /> : <Outlet />}</>;
};

export default PublicLayout;
