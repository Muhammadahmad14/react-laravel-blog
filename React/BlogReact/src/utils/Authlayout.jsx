import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "./auth";

function Authlayout({ children }) {
  const [user] = useState(getUser());

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Authlayout;
