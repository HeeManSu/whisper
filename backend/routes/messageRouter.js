import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

// router.route("/sendMessage").post(isAuthenticated, sendMessage)
// router.route("/:chatId").get(isAuthenticated, allMessages)





export default router;