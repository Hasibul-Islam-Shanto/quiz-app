import { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useContext(UserContext);
  return (
    <>{user && user.role !== "admin" ? <Navigate to="/" /> : <Outlet />}</>
  );
};

export default AdminRoute;
