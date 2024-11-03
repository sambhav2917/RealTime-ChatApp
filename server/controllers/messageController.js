import Message from "../models/message.model.js";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

const addMessage = async (req, res) => {
    try {
        
        const { from, to, message } = req.body;

        // Validate input
        if (!from || !to || !message) {
            return res.status(400).json("All fields are required");
        }

        // Convert `from` and `to` to ObjectId
        const senderObjectId = new  mongoose.Types.ObjectId(from);
        const receiverObjectId = new mongoose.Types.ObjectId(to);
        
        // Create a new message
        const data = await Message.create({
            message: { text: message },
            users: [senderObjectId, receiverObjectId],
            sender: senderObjectId
        });
        
        
        
        if (data) {
            return res.status(200).json("Message added");
        } else {
            return res.status(400).json("Message not added");
        }
    } catch (error) {
        console.error(`Error in addMessage function: ${error}`);
        res.status(500).json(`Error in addMessage function: ${error}`);
    }
};

const getAllMessages = async (req, res) => {
    try {
        const { from, to } =  req.query;;

        // Validate input
        if (!from || !to) {
            return res.status(400).json("All fields are required");
        }

        // Convert `from` and `to` to ObjectId
        const senderObjectId = new  mongoose.Types.ObjectId(from);
        const receiverObjectId = new mongoose.Types.ObjectId(to);
        
        // Find all messages between sender and receiver
        const messages = await Message.find({
            users: { $all: [senderObjectId, receiverObjectId] }
        }).sort({ updatedAt: 1 });
        
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === senderObjectId.toString(),
                message: msg.message.text
            };
        });
        res.status(200).json(projectedMessages);
       
    } catch (error) {
       
        res.status(500).json(`Error in getAllMessages function: ${error}`);
    }
};

export { addMessage, getAllMessages };
