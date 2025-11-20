import jwt from 'jsonwebtoken';
import user from "../models/user.model";
import { Request, Response } from "express";
import { userSchemaZod } from "../models/user.model";
import { generateToken } from "../utils/token";



interface userRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
        role?: string;
        avatar?: string;
        status?: string;
    };
    params: {
        id: string;
    }
}
interface tokenPayload {
    userId: string | object;
    email: string;
    role: 'admin' | 'user' | 'manager';
}


const getAllUsers = async (req: Request, res: Response) => {
    const allUser = await user.find();
    res.status(200).json({
        data: allUser,
        authentication: true,
        status: true,
        message: "Get all users",
    });
};

const loginUser = async (req: userRequest, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email: email }).select('+password');
    // console.log(existingUser?.password);
    if (!existingUser) {
        return res.status(404).json({
            data: null,
            authentication: false,
            status: false,
            message: "User not found",
        });
    }
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({
            data: null,
            authentication: false,
            status: false,
            message: "Invalid password",
        });
    }
    const payload: tokenPayload = {
        userId: existingUser._id as object,
        email: existingUser.email,
        role: existingUser.role
    }
    const token = generateToken(payload, 600);

    res.cookie('token', token, { httpOnly: true, maxAge: 600000 , sameSite: 'lax' , secure: false });
    res.status(200).json({
        data: existingUser,
        authentication: true,
        status: true,
        message: "Login successful",
    });
};


const createUser = async (req: userRequest, res: Response) => {
    try {
        const validateData = userSchemaZod.safeParse(req.body);
        if (!validateData.success) {
            const message = validateData.error.issues.map((msg) => {
                return { [msg.path[0]]: msg.message };
            });
            return res.status(400).json({
                data: message,
                authentication: false,
                status: false,
                message: "Invalid user data",
            });
        }
        const { name, email, password, role, avatar, status } = req.body;

        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                data: null,
                authentication: false,
                status: false,
                message: "Email already in use",
            });
        }


        const userData = await user.create({
            name,
            email,
            password,
            role,
            avatar,
            status,
        });

        const payload: tokenPayload = {
            userId: userData._id as object,
            email: userData.email,
            role: userData.role
        }
        const token = generateToken(payload, 600);

        res.cookie('token', token, { httpOnly: true, maxAge: 600000 });
        res.status(201).json({
            data: userData,
            authentication: true,
            status: true,
            message: "User created successfully",
        });
    } catch (error: any) {
        throw error.message;
    }
};


const updateUser = async (req: userRequest, res: Response) => {
    const { id } = req.params;
    const { name, email, role, avatar, status } = req.body;
    const validateData = userSchemaZod.safeParse(req.body);
    if (!validateData.success) {
        const message = validateData.error.issues.map((msg) => {
            return { [msg.path[0]]: msg.message };
        });
        return res.status(400).json({
            data: message,
            authentication: true,
            status: false,
            message: "Invalid user data",
        });
    }
    const ifExist = await user.findById(id);
    if (!ifExist) {
        return res.status(404).json({
            data: null,
            authentication: true,
            status: false,
            message: "User not found"
        })
    }
    await user.findByIdAndUpdate(id, { name, email, role, avatar, status });
    res.status(200).json({
        data: null,
        authentication: true,
        status: true,
        message: "Update User Data Successfully"
    })
}

const deleteUser = async (req: userRequest, res: Response) => {
    const { id } = req.params;
    const ifExist = await user.findById(id);
    if (!ifExist) {
        return res.status(404).json({
            data: null,
            authentication: true,
            status: false,
            message: "User not found"
        })
    }
    await user.findByIdAndDelete(id);
    res.status(200).json({
        data: null,
        authentication: true,
        status:true,
        message: "User Deleted Successfully"
    })
}

const userController = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};

export default userController;
