import { Hono } from "hono";
import { meetingController } from "../controllers/meeting.controller";

const router = new Hono();

router.post("/create", meetingController.create);
router.get("/latest", meetingController.getLatest);
router.get("/getAll", meetingController.getAll);
router.get("/getOne/:id", meetingController.getOne);
router.put("/update/:id", meetingController.update);
router.delete("/delete/:id", meetingController.delete);
router.patch("/deactivate/:id", meetingController.deactivate);
router.patch("/activate/:id", meetingController.activate);

export default router;

