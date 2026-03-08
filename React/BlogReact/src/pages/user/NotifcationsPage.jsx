import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userObj } from "../../Laravel/User";
import Loading from "../../components/Loading";
import { setUnreadNotificationCount } from "../../utils/auth";

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
        setUnreadNotificationCount(0);
      } else {
        setError("Failed to mark all as read.");
      }
    } catch (error) {
      setError("Failed to mark all as read.");
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await userObj.markAsRead(notificationId);
      if (response.success) {
        const notification = unreadNotifications.find(
          (n) => n.id === notificationId,
        );
        if (notification) {
          setReadNotifications((prev) => [...prev, notification]);
          setUnreadNotifications((prev) =>
            prev.filter((n) => n.id !== notificationId),
          );
          setUnreadNotificationCount((prev) => prev - 1);
        }
      } else {
        setError("Failed to mark as read.");
      }
    } catch (error) {
      setError("Failed to mark as read.");
    }
  };

  const getNotifications = async () => {
    try {
      const response = await userObj.getNotifcations();
      if (response.success) {
        setReadNotifications(response.data.readNotifications);
        setUnreadNotifications(response.data.unreadNotifications);
        setUnreadNotificationCount(response.data.unreadNotifications.length);
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

  const deleteNotification = async (notificationId) => {
    try {
      const response = await userObj.deleteNotification(notificationId);
      if (response.success) {
        setReadNotifications((prev) =>
          prev.filter((n) => n.id !== notificationId),
        );
        setUnreadNotifications((prev) =>
          prev.filter((n) => n.id !== notificationId),
        );
      } else {
        setError("Failed to delete notification.");
      }
    } catch (error) {
      setError("Failed to delete notification.");
    }
  };

  const deleteReadNotification = async (notificationId) => {
    try {
      const response = await userObj.deleteAllNotifications();
      if (response.success) {
        setReadNotifications([]);
      } else {
        setError("Failed to delete notification.");
      }
    } catch (error) {
      setError("Failed to delete notification.");
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Notifications
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              disabled={unreadNotifications.length === 0}
              onClick={() => markAllasRead()}
            >
              Mark all as read
            </button>
            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              disabled={readNotifications.length === 0}
              onClick={() => deleteReadNotification()}
            >
              Delete all read
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {unreadNotifications.map((notification) => {
            const toLink = notification.data.user_id
              ? `/${notification.data.username}/${notification.data.user_id}/profile`
              : notification.data.post_id
                ? `/post/${notification.data.post_id}`
                : "#";

            return (
              <div
                key={notification.id}
                className="flex justify-between gap-4 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700"
              >
                <div>
                  <Link to={toLink} className="hover:underline">
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {notification.data.message}
                    </p>
                  </Link>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
                <button
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </button>
              </div>
            );
          })}

          {readNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex justify-between items-center p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  {notification.data.message}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
              <button
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                onClick={() => deleteNotification(notification.id)}
              >
                Delete
              </button>
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
