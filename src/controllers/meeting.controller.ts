import { meetingServices } from "../services/meeting.service";
import type { Context } from "hono";

export const meetingController = {
    create: async (c: Context) => {
        try {
            const body = await c.req.json();
            const { title, meetingLink, description, scheduledFor, isActive } = body as {
                title?: string;
                meetingLink?: string;
                description?: string;
                scheduledFor?: string;
                isActive?: boolean;
            };

            if (!title || !meetingLink) {
                return c.json(
                    { error: "Title and meetingLink are required" },
                    400
                );
            }

            const meeting = await meetingServices.createMeeting({
                title,
                meetingLink,
                description,
                scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
                isActive: isActive !== undefined ? isActive : true,
            });

            return c.json(
                { message: "Meeting created successfully", meeting },
                201
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    getLatest: async (c: Context) => {
        try {
            const meeting = await meetingServices.getLatestMeeting();
            return c.json(
                { message: "Latest meeting fetched successfully", meeting },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 404);
        }
    },

    getAll: async (c: Context) => {
        try {
            const limit = c.req.query("limit");
            const skip = c.req.query("skip");
            const includeInactive = c.req.query("includeInactive") === "true";

            const result = await meetingServices.getAllMeetings(
                limit ? parseInt(limit) : undefined,
                skip ? parseInt(skip) : undefined,
                includeInactive
            );

            return c.json(
                {
                    message: "Meetings fetched successfully",
                    ...result,
                },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    getOne: async (c: Context) => {
        try {
            const id = c.req.param("id");
            if (!id) {
                return c.json({ error: "Meeting ID is required" }, 400);
            }

            const meeting = await meetingServices.getMeeting(id);
            return c.json(
                { message: "Meeting fetched successfully", meeting },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 404);
        }
    },

    update: async (c: Context) => {
        try {
            const id = c.req.param("id");
            const body = await c.req.json();

            if (!id || !body) {
                return c.json({ error: "ID and update body are required" }, 400);
            }

            // Convert scheduledFor if provided
            if (body.scheduledFor) {
                body.scheduledFor = new Date(body.scheduledFor);
            }

            const meeting = await meetingServices.updateMeeting(id, body);
            return c.json(
                { message: "Meeting updated successfully", meeting },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    delete: async (c: Context) => {
        try {
            const id = c.req.param("id");
            if (!id) {
                return c.json({ error: "Meeting ID is required" }, 400);
            }

            const meeting = await meetingServices.deleteMeeting(id);
            return c.json(
                { message: "Meeting deleted successfully", meeting },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 404);
        }
    },

    deactivate: async (c: Context) => {
        try {
            const id = c.req.param("id");
            if (!id) {
                return c.json({ error: "Meeting ID is required" }, 400);
            }

            const meeting = await meetingServices.deactivateMeeting(id);
            return c.json(
                { message: "Meeting deactivated successfully", meeting },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 404);
        }
    },

    activate: async (c: Context) => {
        try {
            const id = c.req.param("id");
            if (!id) {
                return c.json({ error: "Meeting ID is required" }, 400);
            }

            const meeting = await meetingServices.activateMeeting(id);
            return c.json(
                { message: "Meeting activated successfully", meeting },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 404);
        }
    },
};

