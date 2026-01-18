import React,{ useId } from "react";

function Checkbox({ label, checked, onChange, className = "" },ref) {
  const id = useId(); 

  return (
    <div className={`w-full px-3 mb-5 ${className}`}>
      <div className="flex items-center gap-2">
        <input
        ref={ref}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-indigo-500 border-2 border-gray-200 rounded focus:ring-indigo-500"
        />
        <label
          htmlFor={id}
          className="text-xs font-semibold px-1 cursor-pointer"
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default React.forwardRef(Checkbox);
