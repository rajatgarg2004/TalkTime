const express = require("express");
const {signupUser , loginUser , logout, followUnfollowUser, updateUser, getUserProfile, getUserProfileById, getSuggestedUsers, freezeAccount} = require("../controllers/user.controller");
const {protectRoute} = require("../middleware/protectRoute");
const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/profileid/:id", getUserProfileById);
router.get("/suggested" , protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login" , loginUser);
router.post("/logout" , logout);
router.post("/follow/:id" , protectRoute, followUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);
module.exports = router;