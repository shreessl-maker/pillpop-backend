import express from "express";
import Test from "../models/Test.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tests
router.get("/", protect, async (req, res) => {
  const tests = await Test.find().populate("createdBy", "name").populate("assignedTo", "name");
  res.json(tests);
});

// Create test
router.post("/", protect, async (req, res) => {
  const test = await Test.create(req.body);
  res.json(test);
});

// Update test
router.put("/:id", protect, async (req, res) => {
  const updated = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete test
router.delete("/:id", protect, async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.json({ message: "Test deleted" });
});

export default router;
