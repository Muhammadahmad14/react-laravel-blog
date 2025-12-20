import React from "react";
import { authservice } from "../Laravel/Auth";
import { useDispatch } from "react-redux";
import { logout  } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
  const response = await authservice.logout();
  if (response.success) {
    dispatch(logout()); // clears Redux
    navigate("/login"); // redirect
  } else {
    console.log(response.error); // handle failure
  }
};

  return (
    <div>
      <button
        type="button"
        className="bg-blue-700 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
