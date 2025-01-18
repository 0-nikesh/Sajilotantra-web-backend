import express from ("express");
import { getNotifications, createNotification } from ("../controller/NotificationController.js");
import { protect, admin } from ("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/all", protect, getNotifications);
router.post("/post", protect, admin, createNotification)

export default router;