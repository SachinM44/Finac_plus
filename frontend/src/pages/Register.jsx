import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Subheading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { Spinner } from "../components/Spinner";
import axios from 'axios';
import { z } from 'zod';
import { RegistrationInput } from "@finacplus1/common";

export const Register = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male"); // Default to "Male"
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      RegistrationInput.parse({ name, age: parseInt(age), dateOfBirth: new Date(dateOfBirth), password, gender, about });

      const payload = {
        name,
        age: parseInt(age),
        dateOfBirth: new Date(dateOfBirth).toISOString(),
        password,
        gender,
        about
      };

      const response = await axios.post("http://localhost:3000/api/v1/user/register", payload);

      const loginResponse = await axios.post("http://localhost:3000/api/v1/user/login", {
        name,
        password,
      });

      localStorage.setItem("token", loginResponse.data.token);

      setMessage("Registration successful!");
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage("Validation failed, check your input.");
      } else {
        setMessage("Registration failed, try again.");
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
            <div className="flex justify-center mb-1">
              <img
                src="/assets/finacplus-logo.webp"
                alt="FinacPlus Logo"
                className="h-8"
              />
            </div>
            <Heading label={"Register"} />
            <Subheading label={"Enter your details to register to your FinacPlus account"} />
            <InputBox onChange={(e) => setName(e.target.value)} label={"Name"} placeholder="Ex: John Doe" />
            <InputBox onChange={(e) => setAge(e.target.value)} label={"Age"} placeholder="Ex: 30" type="number" />
            <InputBox onChange={(e) => setDateOfBirth(e.target.value)} label={"Date of Birth"} placeholder="Ex: 1995-05-15" type="date" />
            <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder="78#$%$#$6s" type="password" />
            <label className="block text-gray-900 text-left mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <InputBox onChange={(e) => setAbout(e.target.value)} label={"About"} placeholder="Tell us about yourself" />
            <div className="pt-4">
              <Button onClick={handleRegister} label={"Register"} />
            </div>
            {message && <p className="text-green-500 mt-4">{message}</p>}
            <BottomWarning label={"Already registered?"} buttonText={"Login"} to={"/login"} />
          </div>
        </div>
      )}
    </div>
  );
};