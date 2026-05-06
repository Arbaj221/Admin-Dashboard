import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = sessionStorage.getItem("isAuth") === "true";
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;