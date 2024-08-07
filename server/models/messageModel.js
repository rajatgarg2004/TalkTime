const mongoose = require("mongoose");
const { type } = require("os");

const messageSchema = new mongoose.Schema({
    conversationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'conversations',
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
    },
    text  : String,
    seen : {
        type : Boolean,
        default : false,
    },
    img : {
        type : String,
        default : null,
    }
},{
    timestamps : true,
})

const Message = mongoose.model('messages', messageSchema);
module.exports = Message; 