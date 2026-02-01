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
          console.log(response.user);
          localStorage.setItem("userData", JSON.stringify(response.user));
          navigate("/");
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
