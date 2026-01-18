import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import Input from "../formComp/Input";
import Button from "../formComp/Button";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Email submitted:", data.email);
    // Here you can call your API to send reset password link
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
            <Button text="Send Reset Link" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
