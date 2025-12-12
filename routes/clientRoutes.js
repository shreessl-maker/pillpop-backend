import express from "express";
import Client from "../models/Client.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all clients
router.get("/", protect, async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// Add client
router.post("/", protect, async (req, res) => {
  const newClient = await Client.create(req.body);
  res.json(newClient);
});

// Update client
router.put("/:id", protect, async (req, res) => {
  const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete client
router.delete("/:id", protect, async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted" });
});

export default router;
