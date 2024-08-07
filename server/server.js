const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const cors = require("cors");
const {v2} =  require("cloudinary");
const socketModule = require('./socket/socket.js');
const app = socketModule.app;
const httpServer = socketModule.httpServer;
const cloudinary = v2;
dotenv.config();
require("./database/connect.js");
const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin: [
      "http://localhost:3000", 
      "https://talk-time-seven.vercel.app",
      "https://talk-time-git-main-rajats-projects-3a8b2d11.vercel.app",
      "https://talk-time-a39cehnh4-rajats-projects-3a8b2d11.vercel.app"
    ],
    credentials: true // Allow credentials
  }));

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
httpServer.listen(PORT,(err)=>{
    if(err){
        console.log("Erorr ",err);
    }else{
        console.log("Server is running on PORT", PORT);
    }
})
