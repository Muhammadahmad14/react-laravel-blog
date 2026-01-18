// hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import { authservice } from "../Laravel/Auth";

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await authservice.logout();
      if (response.success) {
        navigate("/login"); 
      } else {
        console.error("Logout failed:", response.error);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logout;
}
