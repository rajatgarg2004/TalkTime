const express = require("express");
const {signupUser , loginUser , logout, followUnfollowUser, updateUser, getUserProfile, getUserProfileById} = require("../controllers/user.controller");
const {protectRoute} = require("../middleware/protectRoute");
const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/profileid/:id", getUserProfileById);
router.post("/signup", signupUser);
router.post("/login" , loginUser);
router.post("/logout" , logout);
router.post("/follow/:id" , protectRoute, followUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);
module.exports = router;