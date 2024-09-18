import { Navigate, Outlet } from "react-router-dom";

const GuardRoute = ({ adminInfo, navigateLoginRoute }) => {
  return localStorage.getItem(adminInfo) ? (
    <Outlet />
  ) : (
    <Navigate to={navigateLoginRoute} replace />
  );
};

export default GuardRoute;
