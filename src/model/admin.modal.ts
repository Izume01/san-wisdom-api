import mongoose, { Document } from "mongoose";
import * as bcrypt from "bcryptjs";

export interface IAdmin {
    username: string;
    password: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminDocument extends IAdmin, Document {}

const adminSchema = new mongoose.Schema<AdminDocument>({
    username : {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        validate : {
            validator : (username: string) => {
                return !username.includes(" ");
            },
            message: "Username cannot contain spaces",
        },
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email: string) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: "Invalid email address",
        },  
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        validate: {
            validator: function(password: string) {
                if (password.startsWith('$2b$') || password.startsWith('$2a$')) {
                    return true;
                }
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(password);
            },
            message: "Password must be 8-32 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        },
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    updatedAt : {
        type : Date,
        default : Date.now,
    },
})

adminSchema.pre("save" , async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password as string, 10);
    next();
})

export const AdminModel = mongoose.model("Admin", adminSchema);
