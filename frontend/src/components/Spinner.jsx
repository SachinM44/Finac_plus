import React from "react";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16   border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin">

      </div>
    </div>
  );
};