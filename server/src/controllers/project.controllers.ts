import jwt from 'jsonwebtoken';
import Project from "../models/project.model";
import { Request, Response } from "express";
import { projectSchemaZod } from "../models/project.model";
import { generateToken } from "../utils/token";



interface projectRequest extends Request {
    body: {
        name: string;
        description?: string;
        startDate?: Date;
        endDate?: Date;
        status?: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
        members?: object[];
        createdBy: object
    };
    params: {
        id: string;
    }
}


const getAllProjects = async (req: Request, res: Response) => {
    const allProject = await Project.find();
    res.status(200).json({
        data: allProject,
        authentication: true,
        status: true,
        message: "Get all projects",
    });
};

const createProject = async (req: projectRequest, res: Response) => {
    try {
        const validateData = projectSchemaZod.safeParse(req.body);
        if (!validateData.success) {
            const message = validateData.error.issues.map((msg) => {
                return { [msg.path[0]]: msg.message };
            });
            return res.status(400).json({
                data: message,
                authentication: true,
                status: false,
                message: "Invalid project data",
            });
        }
        const { name, description, startDate, endDate, status, members, createdBy } = req.body;

        const existingProject = await Project.findOne({ name: name });
        if (existingProject) {
            return res.status(409).json({
                data: null,
                authentication: true,
                status: false,
                message: "Project already added",
            });
        }


        const projectData = await Project.create({
            name, description, startDate, endDate, status, members, createdBy
        });
        res.status(201).json({
            data: projectData,
            authentication: true,
            status: true,
            message: "Project created successfully",
        });
    } catch (error: any) {
        throw error.message;
    }
};


const updateProject = async (req: projectRequest, res: Response) => {
    const { id } = req.params;
    const { name, description, startDate, endDate, status, members, createdBy } = req.body;
    const validateData = projectSchemaZod.safeParse(req.body);
    if (!validateData.success) {
        const message = validateData.error.issues.map((msg) => {
            return { [msg.path[0]]: msg.message };
        });
        return res.status(400).json({
            data: message,
            authentication: true,
            status: false,
            message: "Invalid project data",
        });
    }
    const ifExist = await Project.findById(id);
    if (!ifExist) {
        return res.status(404).json({
            data: null,
            authentication: true,
            status: false,
            message: "Project not found"
        })
    }
    await Project.findByIdAndUpdate(id, { name, description, startDate, endDate, status, members, createdBy });
    res.status(200).json({
        data: null,
        authentication: true,
        status: true,
        message: "Update Project Data Successfully"
    })
}

const deleteProject = async (req: projectRequest, res: Response) => {
    const { id } = req.params;
    const ifExist = await Project.findById(id);
    if (!ifExist) {
        return res.status(404).json({
            data: null,
            authentication: true,
            status: false,
            message: "Project not found"
        })
    }
    await Project.findByIdAndDelete(id);
    res.status(200).json({
        data: null,
        authentication: true,
        status: true,
        message: "Project Deleted Successfully"
    })
}

const projectController = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
};

export default projectController;
