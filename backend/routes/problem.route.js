import express from "express";
import registerProblem from "../controllers/problem.controller.js";  // adjust path if needed

const router = express.Router();

// POST /api/problems/register
router.post("/register", registerProblem);

export default router;
