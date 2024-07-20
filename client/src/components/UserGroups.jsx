import { IconButton } from "@mui/material";
import React, { useState } from "react";
import logo from '../assets/home.png';
import SearchIcon from '@mui/icons-material/Search';
import Groups from "./Groups";

export default function UserGroups() {
    const [groups, setGroups] = useState([
        { name: "Test User" }, { name: "Test User" }, { name: "Test User" },
        { name: "Test User" }, { name: "Test User" }, { name: "Test User" },
        { name: "Test User" }, { name: "Test User" }, { name: "Test User" }
    ]);

    return (
        <div className="w-[70%] h-[100%] rounded-[20px] flex flex-col p-[10px] ">
            <div className='bg-white rounded-[20px] flex flex-row items-center p-[10px] '>
                <img src={logo} className="w-[5rem] h-[5rem] rounded-[20px] ml-2" />
                <h1>Online Users</h1>
            </div>
            <div className='bg-white rounded-[20px] flex flex-row items-center p-[10px] m-[10px]'>
                <IconButton>
                    <SearchIcon className='w-[10%]' />
                </IconButton>
                <input type="search" placeholder='search' className='ml-[2%] outline-none bg-white border-none text-[1.25rem] flex-1' />
            </div>
            <div className='shadow-xl overflow-scroll rounded-[20px] flex-1 p-[10px] m-[10px]' id='chats'>
                {groups.map((group, index) => (
                    <Groups props={group} key={index} />
                ))}
            </div>
        </div>
    );
}
