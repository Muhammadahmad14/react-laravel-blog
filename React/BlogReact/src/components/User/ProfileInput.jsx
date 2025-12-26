import React, { forwardRef } from "react";

const ProfileInput = forwardRef(
  ({ error, className = "", type = "text", ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          className={`
            w-full bg-transparent outline-none
            border-b border-transparent
            focus:border-indigo-500
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </>
    );
  }
);

export default ProfileInput;
