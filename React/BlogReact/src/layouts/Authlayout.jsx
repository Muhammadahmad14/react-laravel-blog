import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

function Authlayout() {
  const [user] = useState(getUser());

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default Authlayout;
