import express, { Router } from 'express';
import taskController from '../controllers/task.controllers';
import { authMiddleware } from '../middleware/auth.middleware';

export const taskRoutes: Router = express.Router();

taskRoutes.get('/tasks', authMiddleware, taskController.getAllTasks);
taskRoutes.post('/createtask', authMiddleware ,taskController.createTask);
taskRoutes.patch('/updatetask/:id', authMiddleware, taskController.updateTask);
taskRoutes.delete('/deletetask/:id', authMiddleware, taskController.deleteTask);