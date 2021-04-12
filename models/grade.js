import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    title: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
