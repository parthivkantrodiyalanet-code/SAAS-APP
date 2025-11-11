import jwt from 'jsonwebtoken';
import task from "../models/task.model";
import { Request, Response } from "express";
import { taskSchemaZod } from "../models/task.model";
import { generateToken } from "../utils/token";



interface taskRequest extends Request {
    body: {
        title: string;
        description?: string;
        status?: 'todo' | 'in-progress' | 'done';
        priority?: 'low' | 'medium' | 'high';
        dueDate?: Date;
        assignee?: object;
        projectId: object;
    };
    params: {
        id: string;
    }
}


const getAllTasks = async (req: Request, res: Response) => {
    const allTask = await task.find();
    res.status(200).json({
        data: allTask,
        authentication: true,
        status: true,
        message: "Get all tasks",
    });
};

const createTask = async (req: taskRequest, res: Response) => {
    try {
        const validateData = taskSchemaZod.safeParse(req.body);
        if (!validateData.success) {
            const message = validateData.error.issues.map((msg) => {
                return { [msg.path[0]]: msg.message };
            });
            return res.status(400).json({
                data: message,
                authentication: true,
                status: false,
                message: "Invalid task data",
            });
        }
        const { title, description, status, priority, dueDate, assignee, projectId } = req.body;

        const existingTask = await task.findOne({ title: title });
        if (existingTask) {
            return res.status(409).json({
                data: null,
                authentication: true,
                status: false,
                message: "Task already added",
            });
        }


        const taskData = await task.create({
            title, description, status, priority, dueDate, assignee, projectId
        });
        res.status(201).json({
            data: taskData,
            authentication: true,
            status: true,
            message: "Task created successfully",
        });
    } catch (error: any) {
        throw error.message;
    }
};


const updateTask = async (req: taskRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate, assignee, projectId } = req.body;
    const validateData = taskSchemaZod.safeParse(req.body);
    if (!validateData.success) {
        const message = validateData.error.issues.map((msg) => {
            return { [msg.path[0]]: msg.message };
        });
        return res.status(400).json({
            data: message,
            authentication: true,
            status: false,
            message: "Invalid task data",
        });
    }
    const ifExist = await task.findById(id);
    if (!ifExist) {
        return res.status(404).json({
            data: null,
            authentication: true,
            status: false,
            message: "Task not found"
        })
    }
    await task.findByIdAndUpdate(id, { title, description, status, priority, dueDate, assignee, projectId });
    res.status(200).json({
        data: null,
        authentication: true,
        status: true,
        message: "Update Task Data Successfully"
    })
}

const deleteTask = async (req: taskRequest, res: Response) => {
    const { id } = req.params;
    const ifExist = await task.findById(id);
    if (!ifExist) {
        return res.status(404).json({
            data: null,
            authentication: true,
            status: false,
            message: "Task not found"
        })
    }
    await task.findByIdAndDelete(id);
    res.status(200).json({
        data: null,
        authentication: true,
        status: true,
        message: "Task Deleted Successfully"
    })
}

const taskController = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskController;
