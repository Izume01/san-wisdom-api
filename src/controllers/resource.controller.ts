import { resourceServices } from "../services/resource.service";
import type { Context } from "hono";

export const resourceController = {
    create: async (c: Context) => {
        try {
            const body = await c.req.json();
            const { title, description, fileUrl, fileType } = body as {
                title?: string;
                description?: string;
                fileUrl?: string;
                fileType?: string;
            };

            if (!title || !description || !fileUrl) {
                return c.json(
                    { error: "Title, description, and fileUrl are required" },
                    400
                );
            }

            const resource = await resourceServices.createResource({
                title,
                description,
                fileUrl,
                fileType,
            });

            return c.json(
                { message: "Resource created successfully", resource },
                201
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    getAll: async (c: Context) => {
        try {
            const limit = c.req.query("limit");
            const skip = c.req.query("skip");

            const result = await resourceServices.getAllResources(
                limit ? parseInt(limit) : undefined,
                skip ? parseInt(skip) : undefined
            );

            return c.json(
                {
                    message: "Resources fetched successfully",
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
                return c.json({ error: "Resource ID is required" }, 400);
            }

            const resource = await resourceServices.getResource(id);
            return c.json(
                { message: "Resource fetched successfully", resource },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    update: async (c: Context) => {
        try {
            const id = c.req.param("id");
            const body = await c.req.json();

            if (!id || !body) {
                return c.json({ error: "ID and update body are required" }, 400);
            }

            const resource = await resourceServices.updateResource(id, body);
            return c.json(
                { message: "Resource updated successfully", resource },
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
                return c.json({ error: "Resource ID is required" }, 400);
            }

            const resource = await resourceServices.deleteResource(id);
            return c.json(
                { message: "Resource deleted successfully", resource },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },

    search: async (c: Context) => {
        try {
            const searchTerm = c.req.query("q");
            
            if (!searchTerm) {
                return c.json({ error: "Search query 'q' is required" }, 400);
            }

            const resources = await resourceServices.searchResources(searchTerm);
            return c.json(
                {
                    message: "Search completed successfully",
                    resources,
                    count: resources.length,
                },
                200
            );
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },
};

