import { contentServices } from "../services/content.service";
import type { Context } from "hono";

export const contentController = {
    create: async (c: Context) => {
        const body = await c.req.json();
        const { title, description, image } = body as { title?: string; description?: string; image?: string };

        if (!title || !description) {
            return c.json({ error: "Title and description are required" }, 400);
        }

        try {
            const content = await contentServices.createContent({ title, description, image });
            return c.json({ message: "Content created successfully", content }, 201);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    getOne: async (c: Context) => {
        const id = c.req.param("id");
        if (!id) {
            return c.json({ error: "Content ID is required" }, 400);
        }

        try {
            const content = await contentServices.getContent(id);
            return c.json({ message: "Content fetched successfully", content }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    update: async (c: Context) => {
        const id = c.req.param("id");
        const body = await c.req.json();

        if (!id || !body) {
            return c.json({ error: "ID and update body are required" }, 400);
        }

        try {
            const content = await contentServices.updateContent(id, body);
            return c.json({ message: "Content updated successfully", content }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    delete: async (c: Context) => {
        const id = c.req.param("id");
        if (!id) {
            return c.json({ error: "Content ID is required" }, 400);
        }

        try {
            const content = await contentServices.deleteContent(id);
            return c.json({ message: "Content deleted successfully", content }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    }
};