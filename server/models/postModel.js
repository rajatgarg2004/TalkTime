const mongoose = require("mongoose");
const { type } = require("os");

const postSchema = mongoose.Schema({
    postedBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true,
    }, text : {
         type : String,
         maxLength : 500,
    }, img : {
        type : String,
    }, likes : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "users",
        default : [],
    }, replies : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users',
                required : true,
            },
            text : {
                type : String, 
                required : true,
            }, userProfilePic : {
                type : String,
            }, username : {
                type : String,
            }
        }
    ]
} , {
    timestamps : true,
})

const Post = mongoose.model('posts', postSchema);
module.exports = Post; 