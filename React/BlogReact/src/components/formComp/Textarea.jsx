import React from "react";
import { useId } from "react";

function Textarea({ label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="text-gray-700 dark:text-gray-200">
      {label && (
        <label htmlFor={id}>
          <span className="font-semibold px-1">{label}</span>
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`w-full p-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 ${className}`}
        {...props}
      /> 
    </div>
  );
}

export default React.forwardRef(Textarea);
