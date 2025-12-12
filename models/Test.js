import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    questions: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
