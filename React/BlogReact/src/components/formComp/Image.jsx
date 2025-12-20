import React from "react";

function Image({ link }) {
  return (
    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
      <img src={link} alt="Illustration" className="w-full h-auto" />
    </div>
  );
}

export default Image;
