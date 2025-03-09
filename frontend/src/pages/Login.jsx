
import React from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"

export const Login=()=>{
    return <div className="bg-slate-200 h-screen flex justify-centre">
        <div className="flex flex-col justify-centre">
            <div className="rounded-lg bg-white flex text-centre p-2 h-max px-4 shadow-2xs">
            <Heading label={"Login"} />
            <Subheading label={"Sign in to your FinacPlus account"}/>
            <InputBox label={"Email"} placeholder="Ex:sachin@gmail.com" />
            <InputBox label={"Password"} placeholder="254$%$$" />
            <div className="pt-4px">
            <Button label={"Login"}/>
            </div>
            <BottomWarning label={"don't have account?"} buttonText={"Register"} to={"/Register"} />
            </div>
        </div>
    </div>
}