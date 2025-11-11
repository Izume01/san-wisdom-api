import mongoose, { Document } from "mongoose";

export interface IContent {
    title: string;
    description: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContentDocument extends IContent, Document {}

const contentSchema = new mongoose.Schema<ContentDocument>({
    title : {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    }, 
    description : {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    image : {
        type: String,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
    updatedAt : {
        type: Date,
        default: Date.now,
    },
})

export const ContentModel = mongoose.model("Content", contentSchema);