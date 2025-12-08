import Client from "../models/Client.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Create a new client company and its admin user
export const createClient = async (req, res) => {
  try {
    const { name, email, phone, address, subdomain, adminPassword } = req.body;

    // Check if client already exists
    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Client already exists with this email." });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      address,
      subdomain,
    });

    // Hash password for the admin
    const hashedPassword = await bcrypt.hash(adminPassword || "Admin@123", 10);

    await User.create({
      name: `${name} Admin`,
      email,
      password: hashedPassword,
      role: "admin",
      clientId: client._id,
    });

    res.json({ message: "Client created successfully", client });
  } catch (err) {
    res.status(500).json({ message: "Error creating client", error: err.message });
  }
};

// Get list of all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch clients", error: err.message });
  }
};
