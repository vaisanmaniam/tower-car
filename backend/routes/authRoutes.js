import express from "express";
import { registerDriver, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", login);

export default router;
