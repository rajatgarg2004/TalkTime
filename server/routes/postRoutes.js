const express = require("express");
const {createPost} = require("../controllers/post.controller");
const {protectRoute} = require("../middleware/protectRoute");

const router = express.Router();

router.post("/create", protectRoute, createPost);

module.exports = router;
