import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ label, to, onClick }) => {
  return (
    <Link to={to} onClick={onClick} className="w-full  p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-center">
      {label}  
    </Link>
  );  
};