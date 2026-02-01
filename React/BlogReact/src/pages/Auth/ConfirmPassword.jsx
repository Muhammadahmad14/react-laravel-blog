import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, ShieldCheck } from "lucide-react";
import { Input, Button, Image, Checkbox } from "../../components/formComp";
import { useNavigate } from "react-router-dom";
import { authservice } from "../../Laravel/Auth";
import { Loader2 } from "lucide-react";

function ConfirmPassword() {
  const navigate = useNavigate();

  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await authservice.resetPassword(
        data.password,
        data.confirmpassword,
      );
      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">Reset Password</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Password"
            type={isPwdVisible ? "text" : "password"}
            Icon={Lock}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type={isPwdVisible ? "text" : "password"}
            Icon={ShieldCheck}
            {...register("confirmpassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={errors.confirmpassword?.message}
          />

          <Checkbox
            label="Show Password"
            checked={isPwdVisible}
            onChange={(e) => setIsPwdVisible(e.target.checked)}
            className="mb-7"
          />

          <div className="mt-5">
            <Button
              text={
                loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-100" />
                ) : (
                  "Confirm Password"
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmPassword;
