import React from "react";

const activities = [
  { id: 1, user: "Ahmad", action: "added a new post", time: "2 hours ago" },
  { id: 2, user: "Sara", action: "commented on a post", time: "3 hours ago" },
  { id: 3, user: "Ali", action: "updated profile", time: "5 hours ago" },
  { id: 4, user: "Hassan", action: "blocked a user", time: "1 day ago" },
];

function RecentActivities() {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Recent Activities
      </h2>

      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-gray-700 dark:text-gray-200 font-medium">
                {activity.user}
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {activity.action}
              </p>
            </div>
            <span className="text-gray-400 dark:text-gray-400 text-xs">
              {activity.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;
