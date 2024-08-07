const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true,
    }, username:{
        type: String,
        required : true,
        unique : true,
    }, email:{
        type: String,
        required : true,
        unique : true,
    }, password:{
        type: String,
        minLength : 6,
        required : true,
    }, profilePic : {
        type : String,
        default : "https://res.cloudinary.com/djlmerfrj/image/upload/v1721756983/defaultPhoto_jknsdd.png"
    }, followers : {
        type : [String],
        default : [],
    }, following : {
        type : [String],
        default : [],
    }, bio : {
        type : String,
        default : "",
    }, isFrozen : {
        type : Boolean,
        default : false,
    }
} , {
    timestamps : true,
})

const User = mongoose.model('users', userSchema);
module.exports = User; 