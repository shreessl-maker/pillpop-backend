import express from "express";
import { submitResult, getUserResults } from "../controllers/resultController.js";

const router = express.Router();

// POST /api/results/submit
router.post("/submit", submitResult);

// GET /api/results/user/:userId
router.get("/user/:userId", getUserResults);

export default router;
