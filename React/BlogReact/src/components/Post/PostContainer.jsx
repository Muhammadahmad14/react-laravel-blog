import React from "react";

function PostContainer({children}) {
  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      <div className="flex flex-col items-center justify-center ">
        {children}
      </div>
    </div>
  );
}

export default PostContainer;
