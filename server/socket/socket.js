const Server = require('socket.io').Server;
const http = require('http');
const express = require('express');
const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');

const app = express();
const httpServer = http.createServer(app);

const userSocketMap = {}
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});
const getRecipientSocketId = (recipientId)=>{
    return userSocketMap[recipientId];
}
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId !== 'undefined'){
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", ()=>{
        console.log("User Disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
    socket.on("markMessagesAsSeen" , async ({conversationId, userId})=>{
        try{
            await Message.updateMany({
                conversationId : conversationId,
                seen : false,
            },{$set : {seen : true}});
            await Conversation.updateOne({
                _id : conversationId
            },{
                $set : { "lastMessage.seen" : true}
            })
            io.to(userSocketMap[userId]).emit("messagesSeen" , {conversationId});
        }catch(err){    
            console.log(err);
        }
    })
});


module.exports = {
    io,
    httpServer,
    app,
    getRecipientSocketId
};
