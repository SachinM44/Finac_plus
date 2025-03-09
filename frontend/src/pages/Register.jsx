import React from "react";
import { Heading } from "../components/Heading";
import { Subheading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Register = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-2xs">
          <Heading label={"Register"} />
          <Subheading label={"Enter your details to register to your FinacPlus account"} />
          <InputBox label={"Username"} placeholder="Ex: sachin12" />
          <InputBox label={"Email"} placeholder="Ex: sachin@gmail.com" />
          <InputBox label={"Password"} placeholder="78#$%$#$6s" />
          <div className="pt-4">
            <Button label={"Register"} />
          </div>
          <BottomWarning label={"Already registered?"} buttonText={"Login"} to={"/login"} />
        </div>
      </div>
    </div>
  );
};