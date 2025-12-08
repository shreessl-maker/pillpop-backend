import Test from "../models/Test.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { generateQuestionsFromText } from "../utils/aiQuestionGenerator.js";

// Create a test with PDF upload and question generation
export const createTest = async (req, res) => {
  try {
    const { title, description, clientId, startTime, endTime, durationMinutes } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // Upload PDF to Cloudinary
    const pdfUrl = await uploadToCloudinary(req.file.path);

    // Extract text from the PDF
    const text = await extractTextFromPDF(req.file.path);

    // Generate questions (AI disabled if key not set)
    const questions = await generateQuestionsFromText(text);

    // Create test entry
    const test = await Test.create({
      title,
      description,
      clientId,
      startTime,
      endTime,
      durationMinutes,
      questions,
    });

    res.json({ message: "Test created successfully", test });
  } catch (err) {
    res.status(500).json({ message: "Error creating test", error: err.message });
  }
};

// Fetch all tests for a client
export const getTestsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const tests = await Test.find({ clientId }).sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: "Failed to load tests", error: err.message });
  }
};
