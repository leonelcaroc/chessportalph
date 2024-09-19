import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ adminInfo, navigateRoute }) => {
  return localStorage.getItem(adminInfo) ? (
    <Navigate to={navigateRoute} replace />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
