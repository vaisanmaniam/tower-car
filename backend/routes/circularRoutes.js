import express from "express";
import { verifyToken, allowRoles } from "../middleware/auth.js";
import { uploadCircular, getCirculars } from "../controllers/circularController.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

// POST /api/admin/circulars → Upload PDF
router.post(
  "/circulars",
  verifyToken,
  allowRoles("SUPER_ADMIN"),
  upload.single("pdf"), // Multer expects field name "pdf"
  uploadCircular
);

// GET /api/admin/circulars → Get all circulars
router.get(
  "/circulars",
  verifyToken,
  allowRoles("SUPER_ADMIN", "DEPOT_MANAGER", "DRIVER"),
  getCirculars
);

export default router;
