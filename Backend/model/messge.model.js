const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
    message:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }

}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
