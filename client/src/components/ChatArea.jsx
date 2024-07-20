import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessageOther from './MessageOthers';
import MessageSelf from './MessageSelf';
function ChatArea() {

  return (
    <div className='w-[70%] border-[5px] flex flex-col shadow-xl'>
        <div className='flex flex-row items-center justify-between p-[10px] bg-white m-2 rounded-lg shadow-xl'>
            <div className="flex flex-row items-center justify-between m-[10px] w-[70%]">
                <p className="flex justify-center items-center text-uppercase bg-gray-300 text-white font-bold text-3xl h-12 w-12 p-1 rounded-full self-center m-[10px]">
                    T
                </p>
                <div className="flex flex-col justify-center flex-1">
                    <p className="font-bold text-gray-600 capitalize">
                        Test1
                    </p>
                    <p className="text-xs font-light italic text-gray-600">
                        Today
                    </p>
                </div>
            </div>
            <div className="text-xs text-gray-600 flex flex-row items-center w-[auto] ml-[10px]">
                <DeleteIcon />
            </div>
        </div>
        <div className='flex flex-col gap-2 bg-white flex-1 overflow-scroll m-2 rounded-lg shadow-xl'>
            <MessageOther />
            <MessageSelf />
            <MessageOther />
            <MessageSelf />
            <MessageOther />
            <MessageSelf />
            <MessageOther />
            <MessageSelf />
        </div>
        <div className='flex flex-col gap-2 bg-white m-2 rounded-lg shadow-xl'>
            <div className='bg-white rounded-[20px] items-center flex flex-row pt-[10px] pb-[10px] pr-[5px] pl-[5px] m-[10px]' id='search'>
                <input type="search" placeholder='Type a message...' className='ml-[2%] outline-none bg-white border-none text-[1.25rem] flex-1' />
                <IconButton>
                    <SendIcon className='w-[10%]' />
                </IconButton>
            </div>
        </div>
    </div>
  )
}

export default ChatArea;
