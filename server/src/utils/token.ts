import jwt from "jsonwebtoken";
import ca from "zod/v4/locales/ca.js";

const JWT_SECRET = process.env.JWT_SECRET ;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (payload:object, expiresIn: number):string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn :`${expiresIn}s`});
}

export const verifyToken = (token:string):boolean => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if ( decoded && typeof decoded !== "string" ){
            return true;
        }
        return false;
    }catch (error) {
        return false;
    }
}