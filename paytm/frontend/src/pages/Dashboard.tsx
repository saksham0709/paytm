import React, { useState } from "react";
import { Balance } from "../components/Balance";
import { Appbar } from "../components/AppBar";
import { Users } from "../components/Users";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Dashboard=()=>{
    const navigate=useNavigate();
    return <div>
        <Appbar/>
        <div>
            <Balance value={80000}/>
            <Users/>
            <div >
            <div className="w-48 items-center">           
             <Button label={"Sign out"} onClick={()=>{
                localStorage.removeItem("token");
                navigate("/signup")
            }}/>
            </div>
            </div>
        </div>
    </div>
}