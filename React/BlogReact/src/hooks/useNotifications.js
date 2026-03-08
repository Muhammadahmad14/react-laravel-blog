import { useEffect, useState } from "react";
import { setUnreadNotificationCount } from "../utils/auth";

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId || !window.Echo) return;

    const channel = window.Echo.private(`App.Models.User.${userId}`);

    channel.notification((notification) => {
      setNotifications((prev) => {
        if (prev.some((n) => n.id === notification.id)) return prev;
        return [notification, ...prev];
      });

      setUnreadNotificationCount((prev) => prev + 1);
    });

    return () => {
      window.Echo.leave(`App.Models.User.${userId}`);
    };
  }, [userId]);

  return notifications;
}