import { useState } from "react";
import { useDispatch } from "react-redux";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { authservice } from "../../Laravel/Auth";
import { login } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { Input, Button, Image, Checkbox } from "../../components/formComp";

function Login() {
  const [isPwdVisible, setisPwdVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const submit = async (data) => {
    try {
      setLoading(true);
      const session = await authservice.login(data);
      if (session.success) {
        const userData = await authservice.getUser();
        if (userData) {
          dispatch(login(userData));
        }
        if (userData.user.role === "admin") {
          navigate("/admin");
          return;
        }
        if (userData.user.role === "user") {
          navigate("/");
        }
      } else {
        setError("Email or Password is wrong");
      }
    } catch (error) {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          {/* Left Image */}
          <Image link="/form.webp" />

          {/* Right Form */}
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Login</h1>
              {error && (
                <div className="mt-3 bg-red-100 text-red-700 px-4 py-2 rounded-lg inline-block shadow-md">
                  {error}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(submit)}>
              <Input
                label="Email"
                type="email"
                placeholder="johnsmith@example.com"
                Icon={Mail}
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email",
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type={isPwdVisible ? "text" : "password"}
                placeholder="************"
                Icon={Lock}
                {...register("password", {
                  required: "password is required",
                })}
                error={errors.password?.message}
              />
              <Checkbox
                label="Show Password"
                checked={isPwdVisible}
                onChange={(e) => setisPwdVisible(e.target.checked)}
                className="mb-7"
              />
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <Button
                    disabled={loading}
                    text={
                      loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-100" />
                      ) : (
                        `LOGIN NOW`
                      )
                    }
                  />
                </div>
              </div>
            </form>
            <div className="flex flex-row gap-3">
              <Link to="/register">
                <p className=" text-center text-base text-black/60 hover:text-blue-600">
                  Don’t have an Account?&nbsp;
                </p>
              </Link>
              <Link to={"/forget-password"}>
                <p className=" text-center text-base text-black/60 hover:text-blue-600 cursor-pointer">
                  Forget Password?&nbsp;
                </p>
              </Link>
            </div>
            <div className="mt-5">
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
