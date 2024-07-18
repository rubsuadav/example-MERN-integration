import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../useAuthContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuthContext();
  const role = localStorage.getItem("role");

  if (!isAuthenticated || (role !== "admin" && role !== "owner")) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
