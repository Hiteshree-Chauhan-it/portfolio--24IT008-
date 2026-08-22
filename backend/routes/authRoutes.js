import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", authMiddleware, getMe);

export default router;
