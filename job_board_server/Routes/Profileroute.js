import express from "express";
import {getUserProfile,signupProfile,updateProfile} from "../Controllers/Profilecontroller.js"
const profileroute  = express.Router();

profileroute.get('/',getUserProfile);
profileroute.post('/signup',signupProfile);
profileroute.put('/update',updateProfile);

export default profileroute