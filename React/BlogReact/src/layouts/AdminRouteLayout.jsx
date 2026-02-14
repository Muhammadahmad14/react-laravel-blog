import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

function AdminRouteLayout() {
  const [user] = useState(getUser());

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user && user.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}

export default AdminRouteLayout;
