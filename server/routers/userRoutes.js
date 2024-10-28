import { Router } from "express";
import {register,login} from "../controllers/userController.js"
import { setAvatar } from "../controllers/userController.js";

const userRouter=Router();
userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/setAvatar/:id",setAvatar);

export default userRouter