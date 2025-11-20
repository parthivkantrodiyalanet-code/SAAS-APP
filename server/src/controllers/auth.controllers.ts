import { Request, Response } from "express";

const authController = {
    token: (req:Request, res:Response) => {
        res.status(200).json({ message: "Token is valid" , authentication: true });
    }
};

export default authController;