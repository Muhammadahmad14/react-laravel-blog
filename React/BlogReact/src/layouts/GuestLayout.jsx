import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

function GuestLayout() {
  const user = getUser();

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default GuestLayout;
