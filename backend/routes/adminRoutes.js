import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import { getAdminReport, getAllDrivers } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/drivers",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  getAllDrivers
);
router.get(
  "/reports",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  getAdminReport
);


export default router;
