import mongoose from "mongoose";
import { chapterSchema } from "./Chapter.js";

const gradeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    chapters: [chapterSchema],
  },
  { timestamps: { createdAt: "created_at" } }
);

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
