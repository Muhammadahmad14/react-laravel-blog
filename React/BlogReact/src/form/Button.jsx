import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <div className="w-full">
      <button
        className={`w-full inline-flex justify-center items-center rounded-md border border-indigo-600 
          bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm 
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
          active:scale-95 transition duration-150 ease-in-out
          ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
