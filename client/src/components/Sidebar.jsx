import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Conversations from './Conversations';

function SideBar() {
    const [conversations, setConversations] = useState([{
            name: "Test1",
            lastmessage: "hello how jou doing",
            timestamp: "today",
        },{
            name: "Test2",
            lastmessage: "hello how you doing",
            timestamp: "today",
        },{
            name: "Test3",
            lastmessage: "wassup how jou doing",
            timestamp: "today",
        },
    ]);

    return (
        <div className='w-[30%] flex flex-col shadow-xl'>

            <div className='bg-white shadow-xl rounded-[20px] flex flex-row justify-between pt-[10px] pb-[10px] pr-[5px] pl-[5px] m-[10px]' id='header'>
                <div >
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton>
                        <GroupAddIcon />
                    </IconButton>
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <NightlightIcon />
                    </IconButton>
                </div>
            </div>
            <div className='bg-white shadow-xl rounded-[20px] items-center flex flex-row pt-[10px] pb-[10px] pr-[5px] pl-[5px] m-[10px]' id='search'>
                <IconButton>
                    <SearchIcon className='w-[10%]' />
                </IconButton>
                <input type="search" placeholder='search' className='ml-[2%] outline-none bg-white border-none text-[1.25rem] flex-1' />
            </div>
            <div className='bg-white shadow-xl overflow-scroll rounded-[20px] items-center flex-1 flex-col pt-[10px] pb-[10px] pr-[5px] pl-[5px] m-[10px]' id='chats'>
                {
                    conversations.map((conversation)=>{
                        return <Conversations props={conversation} key={conversation.name} />
                    })
                }
            </div>
        </div>
    )
}

export default SideBar;
