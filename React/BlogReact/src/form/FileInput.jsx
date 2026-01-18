import React, { useId } from "react";

function FileInput({ className = "", label = "Upload your file(s)", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed 
                   border-gray-300 bg-gray-50 p-6 text-gray-700 cursor-pointer 
                   hover:border-indigo-500 hover:bg-indigo-50 transition duration-150 ease-in-out"
      >
      

        <span className="text-sm font-medium">{label}</span>

        <input
          type="file"
          id={id}
          ref={ref}
          className={`sr-only ${className}`}
          multiple
          {...props}
        />
      </label>
    </div>
  );
}

export default React.forwardRef(FileInput);
