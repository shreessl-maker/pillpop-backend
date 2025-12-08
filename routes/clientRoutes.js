import express from "express";
import { createClient, getAllClients } from "../controllers/clientController.js";

const router = express.Router();

// POST /api/client/create
router.post("/create", createClient);

// GET /api/client/all
router.get("/all", getAllClients);

export default router;
