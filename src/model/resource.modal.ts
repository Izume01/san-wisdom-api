import mongoose, { Document } from "mongoose";

export interface IResource {
    title: string;
    description: string;
    fileUrl: string;
    fileType?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResourceDocument extends IResource, Document {}

const resourceSchema = new mongoose.Schema<ResourceDocument>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    fileUrl: {
        type: String,
        required: [true, "File URL is required"],
    },
    fileType: {
        type: String,
        enum: ['image', 'video', 'document', 'other'],
        default: 'other',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt field before saving
resourceSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export const ResourceModel = mongoose.model("Resource", resourceSchema);

