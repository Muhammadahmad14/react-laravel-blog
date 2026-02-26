import React, { useState, useEffect } from "react";
import useNotifications from "../../hooks/useNotifications";
import { getUser } from "../../utils/auth";

function Suggestion() {
  const user = getUser();
  const notifications = useNotifications(user?.id);

  return (
    <div className="fixed top-8 right-4 space-y-2 z-50">
      {user &&notifications.map((notifcation) => (
        <div
          key={notifcation.id}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {notifcation.message}
        </div>
      ))}
    </div>
  );
}

export default Suggestion;
