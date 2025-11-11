import mongoose, {Schema,Model,Document} from 'mongoose';
import {z} from 'zod';
import bcrypt from 'bcrypt';


export const userSchemaZod = z.object({
    name:z.string().min(1,"Name must be at least 1 character long").max(50,"Name must be at most 50 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6,"Password must be at least 6 characters long"),
    role: z.enum(["admin", "user", "manager"], {
        message: "Invalid role provided. Must be 'admin', 'user', or 'manager'."
    }).default("user"),
    avatar: z.url("Invalid URL").optional().default(""),
    status: z.enum(["active", "suspended", "pending"], {
        message: "Status must be 'active', 'suspended', or 'pending'."
    }).default("pending"),
}).strict();

type userInput = z.infer<typeof userSchemaZod>; 

export interface IUser extends userInput,Document {
    "createdAt": Date;
    "updatedAt": Date;
    comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email must be unique"],
        index:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:["admin","user","manager"],
        default:"user"
    },
    avatar:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["active","suspended","pending"],
        default:"pending"
    }
},{ timestamps:true });


export const hashPassword = async (password:string):Promise<string>=>{
    const hashPass = await bcrypt.hash(password,10);
    return hashPass;
}

userSchema.pre<IUser>('save', async function(next){
    if (this.isModified('password')){
        this.password = await hashPassword(this.password);
    }
    next();
})

userSchema.methods.comparePassword = async function(userPassword:string):Promise<boolean>{
    return bcrypt.compare(userPassword,this.password)
}

const User:Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;