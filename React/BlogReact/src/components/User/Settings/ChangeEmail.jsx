import { useState } from "react";
import Input from "../../formComp/Input";
import { userObj } from "../../../Laravel/User";

function ChangeEmail({ id, onSuccess, onError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeemail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const response = await userObj.ChangeEmail(id, email, password);

    if (response.success) {
      onSuccess?.();
    } else {
      if (response.status === 422) {
        setErrors(response.errors);
      } else {
        onError?.(response.message || "Failed to change email");
      }
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleChangeemail}>
      <div>
        <Input
          type="email"
          placeholder="New Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: null }));
          }}
          error={errors?.email?.[0]}
          required
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: null }));
          }}
          error={errors?.password?.[0]}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {loading ? "Loading..." : "Update Email"}
      </button>
    </form>
  );
}

export default ChangeEmail;
