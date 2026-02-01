import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { Input, Button, } from "../../components/formComp";
import { useNavigate } from "react-router-dom";
import { authservice } from "../../Laravel/Auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await authservice.sendOtp(data.email);
      localStorage.setItem("email", data.email);

      if (res.success) {
        navigate("/confirm-otp");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">Forgot Password</h1>
          <p className="text-gray-600 text-sm mt-2">
            Enter your email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            Icon={Mail}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            error={errors.email?.message}
          />

          <div className="mt-5">
            <Button
              text={
                loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-100" />
                ) : (
                  "Send OTP"
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
