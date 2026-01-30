import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock,ShieldCheck } from "lucide-react";
import Input from "../formComp/Input";
import Button from "../formComp/Button";
import Checkbox from "../formComp/CheckBox";
function ConfirmPassword() {
  const [isPwdVisible, setisPwdVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");
  const onSubmit = (data) => {
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
              required: "password is required",
              minLength: {
                value: 8,
                message: "password must contain at least 8 words",
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type={isPwdVisible ? "text" : "password"}
            Icon={ShieldCheck}
            {...register("confirmpassword", {
              required: "password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={errors.confirmpassword?.message}
          />
          <Checkbox
            label="Show Password"
            checked={isPwdVisible}
            onChange={(e) => setisPwdVisible(e.target.checked)}
            className="mb-7"
          />

          <div className="mt-5">
            <Button text="Confirm Password" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmPassword;
