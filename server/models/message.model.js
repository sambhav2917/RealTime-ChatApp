import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./user.model.js";

const messageSchema = new Schema({
    message:{
        text:{
            type: String,
            required: true
        }
    },
        users: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User" ,
            required: true
        }
    },{
        timestamps: true
    }
)

export default mongoose.model("Message", messageSchema)