import { Router } from "express";
import {addMessage,getAllMessages} from "../controllers/messageController.js"
const messageRouter = Router();

messageRouter.post("/send",addMessage);
messageRouter.get("/getmsg", getAllMessages);

export default messageRouter