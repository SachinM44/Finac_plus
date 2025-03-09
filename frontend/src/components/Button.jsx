import React from "react";

export const Button = ({ label }) => {
  return (
    <button className="w-full p-2 bg-blue-500 text-white rounded">
      {label}
    </button>
  );
};