const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const cors = require("cors");
const {v2} =  require("cloudinary");
const socketModule = require('./socket/socket.js');
const path = require("path");
const app = socketModule.app;
const httpServer = socketModule.httpServer;
const cloudinary = v2;
dotenv.config();
require("./database/connect.js");
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:false}));


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
console.log(__dirname)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
	});
}
httpServer.listen(PORT,(err)=>{
    if(err){
        console.log("Erorr ",err);
    }else{
        console.log("Server is running on PORT", PORT);
    }
})
