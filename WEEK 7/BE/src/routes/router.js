import express from 'express';
import protectRoute from '../middleware/user.middleware.js'; // Ensure the path is correct
import { logInUser,signUpUser,changePassword,logOutUser} from '../controller/userLogin.controller.js';
const router=express.Router();
router.post('/signupUser',signUpUser);
router.post('/loginUser',logInUser);
router.put('/change-password', protectRoute, changePassword);
router.post('/logout', logOutUser);
export default router;