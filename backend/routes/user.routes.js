import express from "express";
import {register,login, updateprofile,logout} from "../controllers/user.controllers.js";
import { singleUpload } from "../middlewares/multer.js";
const router=express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(updateprofile);
export default router;