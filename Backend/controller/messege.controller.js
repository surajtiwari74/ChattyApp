
const Message= require("../model/messge.model");
const Chat =  require("../model/chat.model")
const{getReceiverSocketId,io} = require('../socket/socket')
async function sendMessege (req,res)
{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;
        
        let gotConversation = await Chat.findOne({
            participants:{$all : [senderId, receiverId]},
        });

        if(!gotConversation){
            gotConversation = await Chat.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        

        await Promise.all([gotConversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            await Message.updateMany(
                { $and:[{receiverId: senderId}, {isRead: false },{senderId:receiverId}]}, // Unread messages for the current user
                { $set: { isRead: true , status:"delivered"} }
            );
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json({newMessage})
    } catch (error) {
        
    }
}
const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const conversation = await Chat.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");

        await Message.updateMany(
            { receiverId: senderId, senderId: receiverId, isRead: false }, 
            { $set: { isRead: true, status: "read" } }
        );

        res.status(200).json(conversation?.messages || []);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

async function getAllMessege(req,res)
{
    try {
         const allMessage =  await Chat.find({ participants:req.id}).populate("messages")
        
            
            return res.status(200).json({allMessage})
         
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    sendMessege,
    getMessage,
    getAllMessege
}