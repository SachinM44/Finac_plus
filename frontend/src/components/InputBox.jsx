import React from "react";

export const InputBox = ({ label, placeholder, onChange, type="text" }) => {
  return (
    <div className="mb-1">
      <label className="block text-gray-900 text-left">{label}</label>
      <input
      onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
    </div>
  );
};