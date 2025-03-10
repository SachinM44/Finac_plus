// filepath: c:\Users\HP\Desktop\FinacPlus\ViteAndTailwindBoilerplate\src\pages\Home.jsx
import React from "react";
import { Button } from "../components/Button";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="flex justify-center mb-8">
        <img
          src="/assets/finacplus-logo.webp"
          alt="FinacPlus Logo"
          className="h-20"
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to FinacPlus</h1>
      <p className="text-xl text-gray-600 mb-8">Your trusted financial management platform</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button label="Get Started" to="/register" />
      </div>
    </div>
  );
}