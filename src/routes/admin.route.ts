import { Hono } from "hono";
import { adminController } from "../controllers/admin.controller";

const router = new Hono();

router.post("/create", adminController.create);
router.post("/login", adminController.login);
router.get("/getOne/:id", adminController.getOne);
router.put("/update/:id", adminController.update);
router.delete("/delete/:id", adminController.delete);   

export default router;