const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL).then(
    () => {
        console.log("Successfully Connected to database");
    }
).catch((err)=>{
    console.log(err);
});

