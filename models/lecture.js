import mongoose from "mongoose";

const lectureSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    link: String,
    file: { type: mongoose.Schema.Types.ObjectId, ref: "GFS" },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;

export { lectureSchema };
