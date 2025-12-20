import React from "react";

function Sugestion() {
  return (
    <div className="hidden lg:flex-1 lg:block px-4 py-6">
      <h1 className="text-gray-900 dark:text-white font-semibold mb-4">
        Followers
      </h1>
      <ul className="space-y-2 font-medium">
        <li className="flex items-center p-3 rounded-lg text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800">
          Follower 1
        </li>
        <li className="flex items-center p-3 rounded-lg text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800">
          Follower 2
        </li>
      </ul>
    </div>
  );
}

export default Sugestion;
