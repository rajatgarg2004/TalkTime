const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const {v2} =  require("cloudinary");
const cloudinary = v2;
dotenv.config();
require("./database/connect");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:false}));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.listen(PORT,(err)=>{
    if(err){
        console.log("Erorr ",err);
    }else{
        console.log("Server is running on PORT", PORT);
    }
})
