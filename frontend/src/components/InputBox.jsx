import React from "react";

export const InputBox = ({ label, placeholder }) => {
  return (
    <div className="my-2">
      <label className="block text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
    </div>
  );
};