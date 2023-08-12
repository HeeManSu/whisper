import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import {  createPersonChat, getAllPersonChats } from "../controllers/chatController.js";


const router = express.Router();


//Get request to fetch all chats and post to create one to one chat
router.route("/personchat").get(isAuthenticated, getAllPersonChats).post(isAuthenticated, createPersonChat)

//Get details of a specific chat. Delete particular chat. 
// router.route("/personchat").get(isAuthenticated, )


//Group Chat API
// router.route("/groupchat").post(isAuthenticated, createGroupChat);
// router.route("/reanme").put(isAuthenticated, renameGroupChat);
// router.route("/groupremove").put(isAuthenticated, removeFromGroup);
// router.route("/groupadd").put(isAuthenticated, addToGroup);

export default router;