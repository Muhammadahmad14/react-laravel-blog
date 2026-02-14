import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authservice } from "../../Laravel/Auth";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
    } else {
      navigate("/login");
    }
    const getUser = async () => {
      try {
        const response = await authservice.getUser();
        if (response.success) {
          localStorage.setItem("userData", JSON.stringify(response.user));
          if(response.user.role === "admin") {
            navigate("/admin");
            return;
          }
          if(response.user.role === "user") {
            navigate("/");
            return;
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    getUser();
  }, []);

  return <div>Logging in...</div>;
}

export default GoogleCallback;
