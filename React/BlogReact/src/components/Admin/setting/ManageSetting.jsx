import { useForm } from "react-hook-form";
import { Button, Input } from "../../formComp";
import { admin } from "../../../Laravel/admin";
import { useState } from "react";
import Toast from "../../Toast";

function ManageSetting() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [passwordError, setPassowrdError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const newPassword = watch("new_password");

  const submit = async (data) => {
    try {
      const response = await admin.changePassword(
        data.current_password,
        data.new_password,
      );
      if (response.success) {
        setToast({
          show: true,
          message: response.data,
          type: "success",
        });
      } else {
        setPassowrdError(response.error.password[0]);
      }
    } catch (error) {
      setToast({
        show: true,
        message: "Faild to Update",
        type: "error",
      });
    }
  };
  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="w-full max-w-xl mx-auto mt-10 px-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Security Settings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change admin password
            </p>
          </div>
          <div className="px-6 py-6 space-y-2">
            <form onSubmit={handleSubmit(submit)}>
              <Input
                label="Current Password"
                type="password"
                name="current_password"
                placeholder="Enter current password"
                className="text-gray-700 dark:text-gray-300"
                {...register("current_password", {
                  required: "password is required",
                })}
                error={errors.current_password?.message || passwordError}
              />
              <Input
                label="New Password"
                type="password"
                name="new_password"
                placeholder="Enter new password"
                className="text-gray-700 dark:text-gray-300"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                error={errors.new_password?.message}
              />

              <Input
                label="Confirm New Password"
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
                className="text-gray-700 dark:text-gray-300"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === newPassword || "Password cannot match",
                })}
                error={errors.confirm_password?.message}
              />

              <div className="pt-3">
                <Button text="Update Password" disabled={isSubmitting} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSetting;
