import React from "react";

function Button({ text, ...props }) {
  return (
    <button
      type="submit"
      className="
       max-w-xs mx-auto   focus:bg-indigo-700
      w-full  flex items-center justify-center rounded-md border border-indigo-600 
          bg-indigo-600 px-3 py-3 text-sm  font-medium text-white shadow-sm 
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
          active:scale-95 transition duration-150 ease-in-out cursor-pointer"
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
