import React from "react"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signin=()=>{
const [password,setpassword]=useState("");
const [username,setusername]=useState("");
const navigate=useNavigate();
    return <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-lg w-80 bg-white px-4 text-center p-2 h-max ">
      <Heading label={"sign in"}/>
      <Subheading label={"Enter your credential to access your account"}/>
      <Inputbox onChange={(e)=>{
        setusername(e.target.value);
      }} label={"Email"} placeholder={"JoeDoe@example.com"}/>
      <Inputbox onChange={(e)=>{
        setpassword(e.target.value)
      }} label={"Password"} placeholder={"123456"}/>
          <div className="pt-4">
                <Button  onClick={async()=>{
            const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
              username,
              password
            })
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard")
          }} label={"Sign in"} />
              </div>
       <BottomWarning label={"Dont have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
      </div>
    </div>
}