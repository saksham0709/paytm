import React, { useState } from "react"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signup = () => {
  const [firstname,setfirstname]=useState("");
const [lastname,setlastname]=useState("");
const [password,setpassword]=useState("");
const [username,setusername]=useState("");
const navigate=useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <Subheading label={"Enter your infromation to create an account"} />
        <Inputbox onChange={(e)=>{
          setfirstname(e.target.value)
        }} placeholder="John" label={"First Name"} />
        <Inputbox onChange={(e)=>{
          setlastname(e.target.value)
        }} placeholder="Doe" label={"Last Name"} />
        <Inputbox onChange={(e)=>{
          setusername(e.target.value)
        }}placeholder="harkirat@gmail.com" label={"Email"} />
        <Inputbox onChange={(e)=>{
          setpassword(e.target.value)
        }}placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
            const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
              username,
              password,
              firstname,
              lastname
            })
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard")
          }}label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}