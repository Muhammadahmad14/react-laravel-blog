import React, { useId } from "react";

function Input({ label, type = "text", placeholder, error, Icon,className="", ...props },ref) {
  const id = useId();
  const hasIcon = !!Icon;

  return (
    <div className="flex -mx-3">
      <div className="w-full px-3 mb-4">
        {label && (
          <label className={`font-bold px-1  ${className}`} htmlFor={id}>
            {label}
          </label>
        )}

        <div className="relative mt-1">
          {hasIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              <Icon size={18} />
            </span>
          )}

          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`w-full py-2 rounded-lg border-2  text-gray-500 dark:text-gray-400 border-gray-200 outline-none focus:border-indigo-500
              ${hasIcon ? "pl-9 pr-3" : "px-3"}`}
            {...props}
            ref={ref}
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}

export default React.forwardRef(Input);
