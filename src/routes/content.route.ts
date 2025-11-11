import { Hono } from "hono";
import { contentController } from "../controllers/content.controller";

const router = new Hono();

router.post("/create", contentController.create);
router.get("/getOne/:id", contentController.getOne);
router.put("/update/:id", contentController.update);
router.delete("/delete/:id", contentController.delete);

export default router;
