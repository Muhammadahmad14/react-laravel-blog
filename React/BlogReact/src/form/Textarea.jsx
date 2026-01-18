import React from "react";
import { useId } from "react";

function Textarea({ label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id}>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Textarea);
