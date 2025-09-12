import express from "express";
import signup from "../controllers/user.controller.js";  // adjust path if needed

const router = express.Router();

// POST /api/users/signup
router.post("/signup", signup);

export default router;
