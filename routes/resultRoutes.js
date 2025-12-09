import express from "express";
import { getAllResults, getUserResults, saveResult } from "../controllers/resultController.js";

const router = express.Router();

// ✅ For Super Admin / Admin
router.get("/", getAllResults);

// ✅ For Staff / User
router.get("/:userId", getUserResults);

// ✅ For submitting test results
router.post("/", saveResult);

export default router;
