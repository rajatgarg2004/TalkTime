const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req,res)=>{
    try{
        const {postedBy, text, img} = req.body;
        if(!postedBy || !text){
            return res.status(400).json({Message : "PostedBy and Text Fields required"});
        }

        const user = await User.findById(postedBy);
        if(!user){
            return res.status(404).json({Message : "User Not Found"});
        }
        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({Message : "Unauthorised to create Post"});
        }

        const maxLength = 500;

        if(text.length > maxLength){
            return res.status(400).json({Message : `Text must be less than ${maxLength} characters.`});
        }

        const newPost = new Post({postedBy,text,img});
        await newPost.save();

        return res.status(201).json({Message : "Post Created Successfully"});
    }catch(err){    
        return res.status(400).json({Error : err});
        console.log(err);
    }
}
module.exports = {
    createPost,
}