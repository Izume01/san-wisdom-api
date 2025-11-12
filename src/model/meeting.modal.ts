import mongoose, { Document } from "mongoose";

export interface IMeeting {
    title: string;
    meetingLink: string;
    description?: string;
    scheduledFor?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface MeetingDocument extends IMeeting, Document {}

const meetingSchema = new mongoose.Schema<MeetingDocument>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    meetingLink: {
        type: String,
        required: [true, "Meeting link is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    scheduledFor: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
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
meetingSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Index for faster queries on latest active meeting
meetingSchema.index({ isActive: 1, createdAt: -1 });

export const MeetingModel = mongoose.model("Meeting", meetingSchema);

