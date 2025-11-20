import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import authController from "../controllers/auth.controllers";

export const authRoutes = express.Router();

authRoutes.get("/token", authMiddleware , authController.token);
