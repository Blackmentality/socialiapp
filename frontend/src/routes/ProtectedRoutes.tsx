import { Navigate, Outlet } from "react-router-dom";
const ProtectRoutes = ({ children }: any) => {
  const isUser = localStorage.getItem("sociali_user");
  if (!isUser) return <Navigate to="/login" replace />;
  else if (JSON.parse(isUser).interests.length < 3)
    return <Navigate to="/onboarding" replace />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectRoutes;
