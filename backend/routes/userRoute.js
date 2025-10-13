import express from 'express'
import { loginUser,registerUser, getUserData, changePassword } from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/profile', authMiddleware, getUserData); // ADD THIS LINE
userRouter.post('/change-password', authMiddleware, changePassword); // ADD THIS



export default userRouter;
