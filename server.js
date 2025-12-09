import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import resultRoutes from "./routes/resultRoutes.js"; // ✅ make sure this path is correct
import seedRoutes from "./routes/seedRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.get("/", (req, res) => res.send("PillPopHQ API Running ✅"));

// ✅ register all routes
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/results", resultRoutes); // 👈 ensure this is here
app.use("/api/seed", seedRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ PillPopHQ API Running on port ${PORT}`);
});
