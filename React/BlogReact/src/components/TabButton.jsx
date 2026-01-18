import React from "react";

function TabButton({ text, isActive, ...props }) {
  return (
    <button
      className={`pb-2 text-lg transition-all cursor-pointer
        ${
          isActive
            ? "border-b-2 border-black dark:border-white dark:text-gray-200 font-semibold"
            : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }`}
      {...props}
    >
      {text}
    </button>
  );
}

export default TabButton;
