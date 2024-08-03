const express = require("express");
const {createPost , getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts} = require("../controllers/post.controller");
const {protectRoute} = require("../middleware/protectRoute");
const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id",getPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id" , protectRoute, likeUnlikePost);
router.put("/reply/:id" , protectRoute, replyToPost);
router.get("/user/:username", getUserPosts);
module.exports = router;
