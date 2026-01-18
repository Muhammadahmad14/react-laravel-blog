import React, { useState, useEffect } from "react";

function Sugestion() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Follower 1 started following you", mounted: true },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newId = notifications.length + 1;
      setNotifications((prev) => [
        { id: newId, text: `Follower ${newId} started following you`, mounted: false },
        ...prev,
      ]);

      // trigger animation
      setTimeout(() => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === newId ? { ...n, mounted: true } : n))
        );
      }, 10);

      // auto remove after 5s
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newId));
      }, 5000);
    }, 5000);

    return () => clearInterval(timer);
  }, [notifications]);

  return (
    <div className="fixed top-8 right-4 space-y-2 z-50">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-500
            ${n.mounted ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          {n.text}
        </div>
      ))}
    </div>
  );
}

export default Sugestion;
