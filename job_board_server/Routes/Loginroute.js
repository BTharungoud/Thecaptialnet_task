import express from 'express';
import { RegisterUser,userLogin } from "../Controllers/Registercontroller.js";
const router = express.Router();

router.post('/',userLogin);
router.post('/register',RegisterUser);

export default router