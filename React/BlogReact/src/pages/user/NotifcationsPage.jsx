import { useEffect, useState } from "react";
import { userObj } from "../../Laravel/User";
import Loading from "../../components/Loading";
import { set } from "react-hook-form";

function NotificationsPage() {
  const [readNotifications, setReadNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const markAllasRead = async () => {
    try {
      const response = await userObj.markAllAsRead();
      if (response.success) {
        setReadNotifications((prev) => [...prev, ...unreadNotifications]);
        setUnreadNotifications([]);
      } else {
        setError("Failed to mark all as read.");
      }
    } catch (error) {
      setError("Failed to mark all as read.");
    }
  };

  const getNotifications = async () => {
    try {
      const response = await userObj.getNotifcations();
      if (response.success) {
        setReadNotifications(response.data.readNotifications);
        setUnreadNotifications(response.data.unreadNotifications);
      }
    } catch (error) {
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Notifications
          </h1>
          <button
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            onClick={() => markAllasRead()}
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-3">
          {unreadNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex justify-between gap-4 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700"
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {notification.data.message}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
              <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap">
                Mark as read
              </button>
            </div>
          ))}

          {readNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex gap-4 p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  {notification.data.message}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        {unreadNotifications.length === 0 && readNotifications.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
