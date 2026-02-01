import { useState } from "react";
import { useForm } from "react-hook-form";
import { Key } from "lucide-react";
import Input from "../../components/formComp/Input";
import Button from "../../components/formComp/Button";
import { authservice } from "../../Laravel/Auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function ConfirmOtp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await authservice.verifyOtp(data.otp);
      if (response.success) {
        navigate("/confirm-password");
      }
    } catch (error) {
      setMessage(response.error?.message || response.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">Confirm OTP</h1>
          <p className="text-gray-600 text-sm mt-2">
            Enter the OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="OTP"
            type="text"
            placeholder="123456"
            Icon={Key}
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Enter a valid 6-digit OTP",
              },
            })}
            error={errors.otp?.message}
          />

          {message && (
            <p className="text-center text-sm text-red-600 mt-2">{message}</p>
          )}

          <div className="mt-5">
            <Button
              text={
                loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-100" />
                ) : (
                  "Verify OTP"
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmOtp;
