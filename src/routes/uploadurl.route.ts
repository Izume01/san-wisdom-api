import { Hono } from "hono";
import { uploadUrlController } from "../controllers/uploadurl.controller";

const router = new Hono();

router.post("/generate", uploadUrlController.getUploadUrl);

export default router;

