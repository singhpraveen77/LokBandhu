import express from "express";
import { login, signup } from "../controllers/user.controller.js";  // adjust path if needed

const router = express.Router();

// POST /api/users/signup
router.post("/signup", signup);
router.post("/login", login);

export default router;
