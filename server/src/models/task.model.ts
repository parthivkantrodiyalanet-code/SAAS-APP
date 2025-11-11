import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";
import { z } from "zod";

export const taskSchemaZod = z.object({
    title:z.string().min(1,"Title must be at least 1 character long").max(500,"Title must be at most 500 characters long"),
    description: z.string().max(1000,"Description must be at most 1000 characters long").optional().default(""),
    status: z.enum(["todo", "in-progress", "done"], {
        message: "Status must be 'todo', 'in-progress', or 'done'."
    }).default("todo"),
    priority: z.enum(["low", "medium", "high"], {
        message: "Priority must be 'low', 'medium', or 'high'."
    }).default("low"),
    dueDate: z.date().optional(),
    assignee: z.object().optional().default({}),
    projectId: z.object({
        message: "Project ID is required"
    })
}).strict();

type taskInput = z.infer<typeof taskSchemaZod>;

export interface ITask extends taskInput,Document {
    "createdAt": Date;
    "updatedAt": Date;
}

const taskSchema : Schema<ITask> = new Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["todo","in-progress","done"],
        default:"todo"
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low"
    },
    dueDate:{
        type:Date,
    },
    assignee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    }
},{ timestamps:true });

const task:Model<ITask> = mongoose.model<ITask>("Task",taskSchema);
export default task;