const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
require("./database/connect");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.listen(PORT,(err)=>{
    if(err){
        console.log("Erorr ",err);
    }else{
        console.log("Server is running on PORT", PORT);
    }
})
