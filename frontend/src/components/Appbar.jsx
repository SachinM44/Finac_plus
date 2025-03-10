import React from "react";
import { Button } from "./Button";

const Appbar = () => {
  return (
    <div className="shadow-lg flex justify-between items-center px-4 bg-white">
      <img
        src="/assets/finacplus-logo.webp"
        alt="FinacPlus Logo"
        className="h-15 pt-4 px-4 mb-3"
      />
    </div>
  );
};

export default Appbar;