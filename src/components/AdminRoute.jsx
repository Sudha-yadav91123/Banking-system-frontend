import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function AdminRoute() {
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;
  return user.role?.toUpperCase() === "ADMIN"
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;
}
