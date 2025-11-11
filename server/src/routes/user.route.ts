import express, { Router } from 'express';
import  userController  from '../controllers/user.controllers';
import { authMiddleware } from '../middleware/auth.middleware';

export const userRoutes:Router = express.Router();

userRoutes.get('/users', userController.getAllUsers);
userRoutes.post('/createuser', userController.createUser);
userRoutes.patch('/updateuser/:id', authMiddleware ,userController.updateUser);
userRoutes.delete('/deleteuser/:id', authMiddleware, userController.deleteUser);
userRoutes.post('/login', userController.loginUser);