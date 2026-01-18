import { useEffect, useState } from "react";
import { userObj } from "../../../Laravel/User";

function FollowButton({ userid, ...props }) {
  const [followStatus, setFollowStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const userId = Number(userid);

  const authUser = JSON.parse(localStorage.getItem("userData"));

  const base =
    "px-4 py-2 rounded-lg font-medium transition focus:outline-none cursor-pointer";
  const primary = "bg-indigo-600 text-white hover:bg-indigo-700";

  // 🔹 Get follow status
  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await userObj.followStatus(userId);
        if (response.success) {
          setFollowStatus(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getStatus();
  }, [userId]);

  // 🔹 Toggle follow
  const toggleFollow = async () => {
    try {
      setBtnLoading(true);
      const response = await userObj.toggleFollow(userId);
      if (response.success) {
        setFollowStatus(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  // ⛔ Don't show button on own profile
  if (authUser?.id === userId) {
    return (
       <button className={`${base} ${primary}`} disabled>
        You
      </button>
    );
  }

  if (loading) {
    return (
      <button className={`${base} ${primary}`} disabled>
        Loading...
      </button>
    );
  }

  return (
    <button
      disabled={btnLoading}
      onClick={toggleFollow}
      className={`${base} ${primary}`}
      {...props}
    >
      {btnLoading ? "Loading..." : followStatus}
    </button>
  );
}

export default FollowButton;
