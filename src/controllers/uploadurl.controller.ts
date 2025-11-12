import { uploadUrlServices } from "../services/uploadurl.service";
import type { Context } from "hono";

export const uploadUrlController = {
    getUploadUrl: async (c: Context) => {
        try {
            const body = await c.req.json();
            const { fileName, fileType } = body as { fileName?: string; fileType?: string };

            if (!fileName || !fileType) {
                return c.json({ error: "fileName and fileType are required" }, 400);
            }

            const result = await uploadUrlServices.getUploadUrl(fileName, fileType);
            
            return c.json({ 
                message: "Upload URL generated successfully", 
                data: result 
            }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    }
};

