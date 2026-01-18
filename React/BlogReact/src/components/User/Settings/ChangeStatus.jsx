import { useState, useEffect } from "react";
import { userObj } from "../../../Laravel/User";

function ChangeStatus({ userData, onSuccess, onError }) {
  const [profilestatus, setProfilestatus] = useState(userData?.profile_status || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfilestatus(userData?.profile_status || "");
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profilestatus === userData?.profile_status) return;

    setLoading(true);
    try {
      const response = await userObj.ChangeStatus(userData.id, profilestatus);

      if (response.success) {
        onSuccess?.(profilestatus);
        const updatedUser = { ...userData, profile_status: profilestatus };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      } else {
        onError?.(response.message || "Failed to change status");
        setProfilestatus(userData?.profile_status || "");
      }
    } catch {
      onError?.("Something went wrong, please try again later");
      setProfilestatus(userData?.profile_status || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {["private", "friends", "public"].map((status) => (
        <label key={status} className="flex items-center gap-2 dark:text-gray-200">
          <input
            type="radio"
            checked={profilestatus === status}
            onChange={() => setProfilestatus(status)}
          />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </label>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-all"
      >
        {loading ? "Loading..." : "Change"}
      </button>
    </form>
  );
}

export default ChangeStatus;
