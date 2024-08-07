const mongoose = require("mongoose");
const conversationSchema = mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    lastMessage : {
        text : String,
        sender : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
        seen : {
            type : Boolean,
            default : false,
        }
    },
    
},{
    timestamps : true
})
const Conversation = mongoose.model('conversations', conversationSchema);

module.exports = Conversation;