import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],          // optional for MCQ
  correctAnswer: { type: String },      // model answer
  type: { type: String, enum: ["objective", "subjective"], default: "objective" }
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [questionSchema],
  status: {
    type: String,
    enum: ["draft", "live", "disabled"],
    default: "draft"
  },
  createdAt: { type: Date, default: Date.now }
});

const Test = mongoose.model("Test", testSchema);
export default Test;
