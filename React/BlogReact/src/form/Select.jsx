import React from "react";
import { useId } from "react";

function Select({ children, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id}>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </label>
      )}
      <select
        id={id}
        className={`mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm ${className}`}
        {...props}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
