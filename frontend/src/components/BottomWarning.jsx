import React from "react";
import { Link } from "react-router-dom";

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-gray-600">{label}</p>
      <Link to={to} className="text-blue-500">
        {buttonText}
      </Link>
    </div>
  );
};