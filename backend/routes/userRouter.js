import express from "express"
import { forgetpassword, getMyProfile, login, logout, register, resetpassword, searchUser } from "../controllers/userController.js";
import singleUpload from '../middlewares/multer.js';
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//To register a user
router.route("/register").post(singleUpload, register).get((req, res) => {
    res.send("This is my register page")
})

//To login a user
router.route("/login").post(login).get((req, res) => {
    res.send("This request is for login")
})

//logout
router.route("/logout").get(logout)

//forget password
router.route("/forgetpassword").post(forgetpassword)

//reset password
router.route("/resetpassword/:token").put(resetpassword)

//Get my profile
router.route("/me").get(isAuthenticated, getMyProfile)

//Search User
router.route("/searchuser").get(isAuthenticated, searchUser)







export default router;