import React, { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Subheading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { Spinner } from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginInput } from "@finacplus1/common";
import { z } from "zod";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Validate the input data using the Zod schema
      LoginInput.parse({ name, password });

      const payload = {
        name,
        password
      };

      const response = await axios.post("http://localhost:3000/api/v1/user/login", payload);

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);

      setMessage("Logged in successfully");
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1000);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setMessage("Validation failed. Please check your input.");
      } else {
        setMessage("Login failed, please try again");
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-00 h-screen flex justify-center items-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4 shadow-2xl">
            <div className="flex justify-center mb-0">
              <img
                src="/assets/finacplus-logo.webp"
                alt="FinacPlus Logo"
                className="h-8"
              />
            </div>
            <Heading label={"Login"} />
            <Subheading label={"Enter your details to login to your existing account"} />
            <InputBox onChange={(e) => setName(e.target.value)} label={"Name"} placeholder="Ex: John Doe" />
            <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder="78#$%$#$6s" type="password" />
            <div className="pt-3">
              <Button onClick={handleLogin} label={"Login"} />
            </div>
            {message && <p className="text-red-500 mt-4">{message}</p>}
            <BottomWarning label={"Don't have an account?"} buttonText={"Register"} to={"/register"} />
          </div>
        </div>
      )}
    </div>
  );
};