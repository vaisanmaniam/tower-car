import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import { getAdminReport, getAdminUsers } from "../controllers/adminController.js";

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

export default router;
