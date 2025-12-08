import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Client from "../models/Client.js";
import User from "../models/User.js";
import Test from "../models/Test.js";

dotenv.config();

const seedDemoData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB for demo data");

    await Promise.all([
      Client.deleteMany(),
      User.deleteMany(),
      Test.deleteMany(),
    ]);

    const client = await Client.create({
      name: "MediPro Pharma Pvt. Ltd.",
      email: "admin@medipro.com",
      phone: "+91-9876543210",
      address: "Mumbai, India",
      subdomain: "medipro",
    });

    const hashedAdmin = await bcrypt.hash("Admin@123", 10);
    const hashedStaff = await bcrypt.hash("Staff@123", 10);

    const admin = await User.create({
      name: "MediPro Admin",
      email: "admin@medipro.com",
      password: hashedAdmin,
      role: "admin",
      clientId: client._id,
    });

    const staff = await User.create({
      name: "Field Staff",
      email: "staff@medipro.com",
      password: hashedStaff,
      role: "staff",
      clientId: client._id,
    });

    await Test.create({
      title: "Product Alpha Overview",
      description: "A quick introductory quiz on Product Alpha.",
      clientId: client._id,
      createdBy: admin._id,
      questions: [
        {
          questionText: "What is the main benefit of Product Alpha?",
          type: "objective",
          options: ["Low cost", "Taste", "Color", "Packaging"],
          correctAnswer: "Low cost",
        },
        {
          questionText: "Describe Product Alpha briefly.",
          type: "subjective",
          marks: 5,
        },
      ],
    });

    console.log("✅ Demo data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting demo data:", error);
    process.exit(1);
  }
};

seedDemoData();
