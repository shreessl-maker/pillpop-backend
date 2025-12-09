import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId },
  answer: { type: String },
  marksObtained: { type: Number, default: 0 },
});

const resultSchema = new mongoose.Schema(
  {
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    answers: [answerSchema],
    totalMarks: { type: Number, default: 0 },
    obtainedMarks: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);

const resultSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: String }],
  score: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
