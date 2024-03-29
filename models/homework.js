import mongoose from "mongoose";

const GFS = mongoose.model(
  "GFS",
  new mongoose.Schema({}, { strict: false }),
  "uploads.files"
);

const homeworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 15 },
    content: { type: String, required: true },
    accomplishedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "GFS" }],
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    acceptAnswers: Boolean,
    answers: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        fileId: { type: mongoose.Schema.Types.ObjectId, ref: "GFS" },
      },
    ],
    studentsSeen: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: Date,
      },
    ],
    dueDate: Date,
  },

  { timestamps: { createdAt: "created_at" } }
);

const Homework = mongoose.model("Homework", homeworkSchema);

export default Homework;
