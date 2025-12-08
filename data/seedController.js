import Client from "../models/Client.js";
import User from "../models/User.js";
import Test from "../models/Test.js";
import bcrypt from "bcryptjs";

export const seedDemoData = async (req, res) => {
  try {
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

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const staffPassword = await bcrypt.hash("Staff@123", 10);

    await User.create([
      {
        name: "MediPro Admin",
        email: "admin@medipro.com",
        password: adminPassword,
        role: "admin",
        clientId: client._id,
      },
      {
        name: "Field Staff",
        email: "staff@medipro.com",
        password: staffPassword,
        role: "staff",
        clientId: client._id,
      },
    ]);

    await Test.create({
      title: "Product Alpha Overview",
      description: "Introductory quiz for Product Alpha.",
      clientId: client._id,
      questions: [
        {
          questionText: "What is the key benefit of Product Alpha?",
          type: "objective",
          options: ["Cost-effective", "Taste", "Packaging", "Color"],
          correctAnswer: "Cost-effective",
        },
        {
          questionText: "Describe Product Alpha in one sentence.",
          type: "subjective",
          marks: 5,
        },
      ],
    });

    res.json({ message: "✅ Demo data inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to insert demo data", error: error.message });
  }
};
