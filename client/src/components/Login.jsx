import React from "react";
import logo from '../assets/home.png';
import { Button, TextField } from "@mui/material";
export default function Login(){
    return(
        <div className="flex rounded-[20px] bg-[#F0F8FF] h-[90vh] w-[90vw] text-black shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <div className="w-[30%] p-4 flex flex-col justify-center items-center">
                <img src={logo} className="w-[80%]"/>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4">
                <h1>Login</h1>
                <TextField id="standard-basic" label="Enter Username" variant="outlined" className="w-[40%]"/>
                <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" className="w-[40%]"/>
                <Button variant="outlined" className="w-[150px]">Login</Button>
            </div>
        </div>
    );
}