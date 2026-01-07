import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import { getAdminReport, getAdminUsers } from "../controllers/adminController.js";
import { downloadAdminReport } from "../controllers/adminController.js";




const router = express.Router();

router.get(
  "/reports",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  getAdminReport
);

router.get(
  "/users",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  getAdminUsers
);

router.get(
  "/reports/download",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  downloadAdminReport
);

export default router;
