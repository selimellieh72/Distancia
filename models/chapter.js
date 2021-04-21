import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;

export { chapterSchema };
