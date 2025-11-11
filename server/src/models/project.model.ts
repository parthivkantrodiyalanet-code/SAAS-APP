import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";
import { z } from "zod";

export const projectSchemaZod = z.object({
    name:z.string().min(1,"Name must be at least 1 character long").max(100,"Name must be at most 100 characters long"),
    description: z.string().max(1000,"Description must be at most 1000 characters long").optional().default(""),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    status: z.enum(["not-started", "in-progress", "completed", "on-hold"], {
        message: "Status must be 'not-started', 'in-progress', 'completed', or 'on-hold'."
    }).default("not-started"),
    members: z.array(z.object({})).optional().default([]), 
    createdBy: z.object({
        message: "Created By is required"
    })
}).strict();

type projectInput = z.infer<typeof projectSchemaZod>;

export interface IProject extends projectInput,Document {
    "createdAt": Date;
    "updatedAt": Date;
}

const projectSchema : Schema<IProject> = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    description:{
        type:String,
        default:""
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
    status:{
        type:String,
        enum:["not-started","in-progress","completed","on-hold"],
        default:"not-started"
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{ timestamps:true });

const Project:Model<IProject> = mongoose.model<IProject>("Project",projectSchema);   

export default Project;