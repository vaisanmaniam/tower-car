import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import {
  getDriverProfile,
  driverSignIn,
  driverSignOut,
  driverAlerts
} from "../controllers/driverController.js";

const router = express.Router();

router.get("/profile", verifyToken, allowRoles("DRIVER"), getDriverProfile);
router.post("/signin", verifyToken, allowRoles("DRIVER"), driverSignIn);
router.post("/signout", verifyToken, allowRoles("DRIVER"), driverSignOut);
router.get("/alerts", verifyToken, allowRoles("DRIVER"), driverAlerts);

export default router;
