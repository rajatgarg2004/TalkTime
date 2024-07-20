import React, { useState } from "react";
import { IconButton } from "@mui/material";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { create } from "@mui/material/styles/createTransitions";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function CreateGroups() {
//   const lightTheme = useSelector((state) => state.themeKey);
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   // console.log("Data from LocalStorage : ", userData);
//   const nav = useNavigate();
//   if (!userData) {
//     console.log("User not Authenticated");
//     nav("/");
//   }
//   const user = userData.data;
//   const [groupName, setGroupName] = useState("");
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   console.log("User Data from CreateGroups : ", userData);

//   const createGroup = () => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     };

//     axios.post(
//       "http://localhost:8080/chat/createGroup",
//       {
//         name: groupName,
//         users: '["647d94aea97e40a17278c7e5","647d999e4c3dd7ca9a2e6543"]',
//       },
//       config
//     );
//     nav("/app/groups");
//   };

  return (
    <div className="self-center w-[100%]">
        <div className='bg-white rounded-[20px] items-center flex flex-row pt-[10px] pb-[10px] pr-[5px] pl-[5px] m-[10px] justify-between'>
            <input type="search" placeholder='Enter Group Name' className='ml-[2%] outline-none bg-white border-none text-[1.25rem] flex-1' />
            <IconButton>
                <DoneOutlineRoundedIcon className='w-[10%]' />
            </IconButton>
        </div>
    </div>
  );
}

export default CreateGroups;