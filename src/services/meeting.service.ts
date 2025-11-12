import { MeetingModel } from "../model/meeting.modal";
import type { IMeeting } from "../model/meeting.modal";

export const meetingServices = {
    async createMeeting(data: Omit<IMeeting, "createdAt" | "updatedAt">) {
        const meeting = await MeetingModel.create(data);

        if (!meeting) throw new Error("Failed to create meeting");

        return meeting;
    },

    async getLatestMeeting() {
        const meeting = await MeetingModel.findOne({ isActive: true })
            .sort({ createdAt: -1 })
            .exec();

        if (!meeting) throw new Error("No active meeting found");

        return meeting;
    },

    async getAllMeetings(limit?: number, skip?: number, includeInactive?: boolean) {
        const filter = includeInactive ? {} : { isActive: true };
        const query = MeetingModel.find(filter).sort({ createdAt: -1 });

        if (limit) query.limit(limit);
        if (skip) query.skip(skip);

        const meetings = await query.exec();
        const total = await MeetingModel.countDocuments(filter);

        return {
            meetings,
            total,
            limit: limit || total,
            skip: skip || 0,
        };
    },

    async getMeeting(id: string) {
        const meeting = await MeetingModel.findById(id);

        if (!meeting) throw new Error("Meeting not found");

        return meeting;
    },

    async updateMeeting(id: string, data: Partial<IMeeting>) {
        const meeting = await MeetingModel.findByIdAndUpdate(
            id,
            { ...data, updatedAt: new Date() },
            { new: true }
        );

        if (!meeting) throw new Error("Meeting not found");

        return meeting;
    },

    async deleteMeeting(id: string) {
        const meeting = await MeetingModel.findByIdAndDelete(id);

        if (!meeting) throw new Error("Meeting not found");

        return meeting;
    },

    async deactivateMeeting(id: string) {
        const meeting = await MeetingModel.findByIdAndUpdate(
            id,
            { isActive: false, updatedAt: new Date() },
            { new: true }
        );

        if (!meeting) throw new Error("Meeting not found");

        return meeting;
    },

    async activateMeeting(id: string) {
        const meeting = await MeetingModel.findByIdAndUpdate(
            id,
            { isActive: true, updatedAt: new Date() },
            { new: true }
        );

        if (!meeting) throw new Error("Meeting not found");

        return meeting;
    },
};

