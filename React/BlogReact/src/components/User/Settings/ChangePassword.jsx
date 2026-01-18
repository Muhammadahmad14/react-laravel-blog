import { useState } from "react";
import Input from "../../formComp/Input";
import { userObj } from "../../../Laravel/User";

function ChangePassword({ id, onSuccess, onError }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (newPassword !== confirmPassword) {
      setErrors({
        confirm_password: ["Passwords do not match"],
      });
      return;
    }

    setLoading(true);

    try {
      const response = await userObj.ChangePassword(id, password, newPassword);

      if (response.success) {
        onSuccess?.();
      } else {
        if (response.status === 422) {
          setErrors(response.errors);
        } else {
          onError?.(response.message || "Failed to change password");
        }
      }
    } catch (error) {
      onError?.(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="Current Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors?.password?.[0]}
        required
      />

      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={errors?.newPassword?.[0]}
        required
      />

      <Input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors?.confirm_password?.[0]}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg
        hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {loading ? "Loading..." : "Update Password"}
      </button>
    </form>
  );
}

export default ChangePassword;
