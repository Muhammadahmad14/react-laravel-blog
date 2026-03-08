import React, { useEffect, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import { getUser } from "../../utils/auth";

function Suggestion() {
  const user = getUser();
  const notifications = useNotifications(user?.id ?? null);
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (!notifications || notifications.length === 0) return;

    setVisibleNotifications((prev) => {
      const newNotifications = notifications.filter(
        (n) => !prev.some((v) => v.id === n.id)
      );

      newNotifications.forEach((notification) => {
        setTimeout(() => {
          setVisibleNotifications((current) =>
            current.filter((v) => v.id !== notification.id)
          );
        }, 3000);
      });

      return [...prev, ...newNotifications];
    });
  }, [notifications]);

  return (
    <div className="fixed top-8 right-4 space-y-2 z-50">
      {user &&
        visibleNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {notification.message}
          </div>
        ))}
    </div>
  );
}

export default Suggestion;