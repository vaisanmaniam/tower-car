import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import { getAllDrivers } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/drivers",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  getAllDrivers
);

export default router;
