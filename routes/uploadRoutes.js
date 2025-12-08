import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Multer memory storage (no local saving)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload route
router.post("/logo/:userType", upload.single("logo"), async (req, res) => {
  console.log("🔥 Upload request received for:", req.params.userType);

  try {
    if (!req.file) {
      console.log("⚠️ No file found in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📂 File received:", req.file.originalname, req.file.mimetype);

    const fileBuffer = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader
      .upload(fileBuffer, {
        folder: `PharmIQ/${req.params.userType}`,
        use_filename: true,
        unique_filename: false,
      })
      .catch((err) => {
        console.error("❌ Cloudinary upload error:", err);
        throw err;
      });

    console.log("✅ Cloudinary Upload Success:", result.secure_url);

    return res.json({
      success: true,
      message: "Logo uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("🔥 Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message || error,
    });
  }
});

export default router;
