const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { v2: cloudinary } = require("cloudinary");
const Post = require("../models/postModel");

const signupUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return res.status(400).json({ error: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            bio: newUser.bio,
            profilePic: newUser.profilePic,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error: ", err);
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Username or Password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error: ", err);
    }
};

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User Logged Out Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error: ", err);
    }
};

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id).select("-password");
        const currUser = await User.findById(req.user._id).select("-password");

        if (!userToModify || !currUser) {
            return res.status(404).json({ error: "User Not Found" });
        }

        if (id === req.user._id.toString()) {
            return res.status(401).json({ error: "You cannot follow/unfollow yourself" });
        }

        const isFollowing = currUser.following.includes(id);
        if (isFollowing) {
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            res.status(200).json({ message: "User Unfollowed Successfully" });
        } else {
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            res.status(200).json({ message: "User followed Successfully" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    const { name, email, username, password, bio } = req.body;
    let { profilePic } = req.body;

    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: "User not found" });

        if (req.params.id !== userId.toString())
            return res.status(400).json({ error: "You cannot update other user's profile" });

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();
        await Post.updateMany(
            {"replies.userId" : userId},
            {
                $set : {
                    "replies.$[reply].username" : user.username,
                    "replies.$[reply.userProfilePic" : user.userProfilePic
                }
            },
            {arrayFilters : [{
                "reply.userId" : userId
            }]}
        )
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in updateUser: ", err.message);
    }
};

const getUserProfile = async (req, res) => {
    const username = req.params.id;
    try {
        const user = await User.findOne({ username }).select("-password -updatedAt");
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
const getUserProfileById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password -updatedAt");
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    signupUser,
    loginUser,
    logout,
    followUnfollowUser,
    updateUser,
    getUserProfile,
    getUserProfileById
};
