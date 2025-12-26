import React, { forwardRef } from "react";

const ProfileTextarea = forwardRef(({ value, onChange, className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      rows={3} // starting height
      className={`
        w-full bg-transparent outline-none
        border-b border-transparent
        focus:border-indigo-500
        break-words whitespace-normal
        resize-none
        ${className}
      `}
      {...props}
    />
  );
});

export default ProfileTextarea;
