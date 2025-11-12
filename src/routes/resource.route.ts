import { Hono } from "hono";
import { resourceController } from "../controllers/resource.controller";

const router = new Hono();

router.post("/create", resourceController.create);
router.get("/getAll", resourceController.getAll);
router.get("/getOne/:id", resourceController.getOne);
router.put("/update/:id", resourceController.update);
router.delete("/delete/:id", resourceController.delete);
router.get("/search", resourceController.search);

export default router;

