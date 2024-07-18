import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../useAuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}