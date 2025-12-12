import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// REGISTER DEFAULT USERS (DEV ONLY)
router.post("/seed", async (req, res) => {
  try {
    await User.deleteMany();
    await User.insertMany([
      { name: "Super Admin", email: "superadmin@pillpop.com", password: "12345", role: "superadmin" },
      { name: "Admin User", email: "admin@pillpop.com", password: "12345", role: "admin" },
      { name: "Staff Member", email: "staff@pillpop.com", password: "12345", role: "staff" },
    ]);
    res.json({ message: "Seeded default users successfully" });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error });
  }
});

export default router;
