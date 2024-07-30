const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateTokenandSetCookie");
const signupUser = async (req,res) =>{
    // res.send("SignUp Successful");
    try{
        const {name, username, email, password} = req.body;
        const user = await User.findOne({$or: [{email},{username}]});
        if(user){
            return res.status(400).json({"Message" : "User already exists."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            username,
            password : hashedPassword,
        })
        await newUser.save();
        if(newUser._id , res){
            generateTokenAndSetCookie(newUser,res);
            res.status(201).json({
                _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                username : newUser.username,
            })
        }else{
            res.status(400).json({"Error" : "Invalid Data"});
        }
    }catch(err){
        res.status(500).json({
            "Error" : err,
        })
        console.log("Error: ", err);
    }
}
const loginUser = async (req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({$or: [{username}]});
        if(!user){
            return res.status(404).json({"Error" : "User Not Found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");
        console.log(user, isPasswordCorrect);
        if(!isPasswordCorrect){
            return res.status(400).json({"Error" : "Invalid Username or Password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            username : user.username,
        });
    }catch(err){
        res.status(500).json({
            "Error" : err,
        })
        console.log("Error: ", err);
    }
}
const logout = (req,res) =>{
    try{
        res.cookie("jwt","",{
            maxAge:1
        });
        res.status(200).json({"Message" : "User Logged Out Successfully"});
    }catch(err){
        res.status(500).json({
            "Error" : err,
        })
    }
}
const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id).select("-password");
        const currUser = await User.findById(req.user._id).select("-password");

        if (!userToModify || !currUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (id === req.user._id.toString()) {
            return res.status(401).json({ message: "You cannot follow/unfollow yourself" });
        }

        const isFollowing = currUser.following.includes(id);
        if (isFollowing) {
            // Unfollow to toggle
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            res.status(200).json({ message: "User Unfollowed Successfully" });
        } else {
            // Follow to toggle
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            res.status(200).json({ message: "User followed Successfully" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateUser = async (req,res)=>{
    const {name,email, username, password, profilePic, bio} = req.body;
    const userId = req.user._id;

    try{
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message : "User Not Found"});
        }
        if(username){
            const curruser = await User.findOne({username}).select("-password");
            if(curruser){
                return res.status(400).json({"Message" : "Username already exists."});
            }
        }
        if(email){
            const curruser = await User.findOne({email}).select("-password");
            if(curruser){
                return res.status(400).json({"Message" : "Email already exists."});
            }
        }
        if(req.params.id !== userId.toString()){
            return res.status(401).json({message : "You cannot update other profiles"});
        }

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword;
        }

        user.name = name || user.name;
        user.email = email  || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        await user.save();
        
        res.status(200).json({Message : "User Successfully Updated"});
    }catch(err){
        return res.status(400).json({Error : err});
    }
};
const getUserProfile = async(req,res)=>{
    const username = req.params.id;
    try{
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        console.log(user);
        if(!user){
            return res.status(404).json({Message : "User Not Found"});
        }
        return res.status(200).json({user});
    }catch(err){
        return res.status(400).json({Error : err});
    }
};
module.exports = { 
    signupUser,
    loginUser,
    logout,
    followUnfollowUser,
    updateUser,
    getUserProfile
}