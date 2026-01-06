import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import { getDepotDailyLogs, getDepotDrivers, getDepotReport } from "../controllers/depotController.js";

const router = express.Router();

router.get(
  "/drivers",
  verifyToken,
  allowRoles("DEPOT_MANAGER"),
  getDepotDrivers
);
router.get("/daily-logs", verifyToken, allowRoles("DEPOT_MANAGER"), getDepotDailyLogs);
router.get(
  "/reports",
  verifyToken,
  allowRoles("DEPOT_MANAGER"),
  getDepotReport
);


export default router;
