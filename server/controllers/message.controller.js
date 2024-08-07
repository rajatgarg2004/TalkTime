const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { io, getRecipientSocketId } = require("../socket/socket");
const { v2: cloudinary } = require("cloudinary");
const sendMessage = async(req,res)=>{
    try{
        const {recipientId, message} = req.body;
        const senderId = req.user._id;
        let {img} = req.body;
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, recipientId]},
        })

        if(!conversation){
            conversation = new Conversation({
                participants : [senderId,recipientId],
                lastMessage : {
                    text : message,
                    sender : senderId,
                }
            });
            await conversation.save();
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img  = uploadedResponse.secure_url;
        }
        const newMessage = new  Message({
            conversationId : conversation._id,
            sender : senderId,
            text : message,
            img : img || "", 
        })

        await newMessage.save();
        await conversation.updateOne({
            lastMessage:{
                text : message,
                sender : senderId,
            }
        }) 
        const recipientSocketId = getRecipientSocketId(recipientId);
        console.log(recipientSocketId);
        if(recipientSocketId){
            io.to(recipientSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);
    }catch(err){
        res.status(500).json({error : err});
    }
}

const getMessages = async (req, res) => {
	const { otherUserId } = req.params;
	const userId = req.user._id.toString();
    console.log(otherUserId,userId);
	try {
		const conversation = await Conversation.findOne({
			participants: { $all: [userId, otherUserId] },
		});
        console.log(conversation)
		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		const messages = await Message.find({
			conversationId: conversation._id,
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

const getConversations = async(req,res)=>{
    const userId = req.user._id;
    try{
        const conversations = await Conversation.find({participants : userId}).populate({
            path : 'participants',
            select : "username profilePic",
        })

        conversations.forEach(conversation => {
            conversation.participants = conversation.participants.filter(
                participant => participant._id.toString()!==userId.toString()
            )
        });
        res.status(200).json(conversations);
    }catch(err){
        res.status(500).json({error : err});
    }
}
module.exports = {
    sendMessage,
    getMessages,
    getConversations,
}