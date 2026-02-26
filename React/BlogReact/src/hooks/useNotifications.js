import { useEffect, useState } from "react";
import echo from "../eco/echo";

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const channel = echo.private(`App.Models.User.${userId}`);

    channel.notification((notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      echo.leave(`private-App.Models.User.${userId}`);
    };
  }, [userId]);

  return notifications;
}