const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const { sendMessage, getMessages, getConversations } = require("../controllers/message.controller");

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId", protectRoute, getMessages);
router.post("/", protectRoute, sendMessage );
module.exports = router;