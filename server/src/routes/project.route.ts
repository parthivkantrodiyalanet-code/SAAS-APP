import express, { Router } from 'express';
import projectController from '../controllers/project.controllers';
import { authMiddleware } from '../middleware/auth.middleware';

export const projectRoutes: Router = express.Router();

projectRoutes.get('/projects', authMiddleware, projectController.getAllProjects);
projectRoutes.post('/createproject', authMiddleware, projectController.createProject);
projectRoutes.patch('/updateproject/:id', authMiddleware, projectController.updateProject);
projectRoutes.delete('/deleteproject/:id', authMiddleware, projectController.deleteProject);