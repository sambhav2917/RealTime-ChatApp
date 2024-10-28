import { Router } from "express";
 import generateavatar from "../controllers/apiController.js";
const apiRouter = Router();

apiRouter.get("/:id",generateavatar)

export default apiRouter