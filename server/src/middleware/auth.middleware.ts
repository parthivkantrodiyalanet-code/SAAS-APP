
import { verifyToken } from "../utils/token";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    const { token } = req.cookies || {};
    // console.log("Token from cookies:", req.cookies);
    const authHeader:string = token ? token.toString() : null;
    if (!authHeader){
        return res.status(401).json({
            data:null,
            authentication: false,
            message:"Authorization header missing"
        });
    }
    try {
        const verifytoken:boolean = verifyToken(authHeader);
        if (!verifytoken){
            return res.status(403).json({
                data:null,
                authentication: false,
                message:"Invalid or expired token"
            });
        }
        next();
    } catch (error:any) {
        throw error.message;
    }
}