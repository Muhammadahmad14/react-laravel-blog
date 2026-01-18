import React from "react";

export function FormContainer({ children }) {
  return (
    <div className="flex items-center justify-center w-full mt-5 px-4">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl p-8 border border-black/10 shadow-sm">
        {children}
      </div>
    </div>
  );
}

