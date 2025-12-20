import React from "react";

function Button({ text, className = "", ...props}) {
  return (
    <button
      className={`w-full py-2 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-600
     text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
