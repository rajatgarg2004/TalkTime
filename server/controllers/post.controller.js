const Post = require("../models/postModel");
const User = require("../models/userModel");
const { v2: cloudinary } = require("cloudinary");
const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
		let { img } = req.body;
        if (!postedBy || !text) {
            return res.status(400).json({ error: "PostedBy and Text Fields required" });
        }
        const user = await User.findById(postedBy);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorised to create Post" });
        }

        const maxLength = 500;

        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters.` });
        }

        if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}
        const newPost = new Post({ postedBy, text, img });
        await newPost.save();
        console.log("post created")
        return res.status(201).json(newPost);
    } catch (err) {
        return res.status(400).json({ error: err });
        console.log(err);
    }
}
const getPost = async (req, res) => {
    try {
        console.log(req.params);
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        console.log(post);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.error });
    }
}
const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ Message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.error });
        console.log(err);
	}
};
const likeUnlikePost = async(req,res)=>{    
    try{
        const id = req.params.id;
        const userId = req.user._id;
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({error:"Post not found"});
        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost){
            await Post.updateOne({_id: id},{$pull : {likes :  userId}});
            return res.status(200).json({Message : "Successfully Removed From Liked Posts"});
        }else{
            await Post.updateOne({_id: id},{$push : {likes :  userId}});
            return res.status(200).json({Message : "Successfully Added To Liked Posts"});
        }

    }catch(err){
        res.status(500).json({ error: err });
        console.log(err);
    }
}
const replyToPost = async (req,res) =>{
    try{
        const id = req.params.id;
        const postId = await Post.findById(id);
        const userId = req.user._id;
        const {text} = req.body;
        const username = req.user.username;
        const userProfilePic = req.user.profilePic;
        
        if(!text){
            return res.status(400).json({error : "Reply cannot be empty"});
        }
        
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({error : "Post Not Found"});
        }

        const reply = {userId, text, userProfilePic, username};

        post.replies.push(reply);

        await post.save();
        res.status(200).json(reply);

    }catch(err){
        res.status(500).json({ error: err });
        console.log(err);
    }
}
const getFeedPosts = async (req,res)=>{
    try{
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error : "User Not Found"});
        }

        const following = user.following;
        
        const feedPosts = await Post.find({postedBy:{$in : following}}).sort({createdAt:-1});

        res.status(200).json(feedPosts);
    }catch(err){
        return res.status(400).json({error : err});
    }
};

const getUserPosts = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
module.exports = {
    createPost,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,
    getUserPosts
}