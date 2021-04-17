import mongoose from "mongoose";

const requiredString = { type: String, required: true };

const homeworkSchema = new mongoose.Schema(
  {
    title: requiredString,
    content: requiredString,
    accomplishedUsersIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    fileIds: [String],
    grade: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
    acceptAnswers: Boolean,
    answers: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        fileId: String,
      },
    ],
    dueDate: Date,
  },

  { timestamps: { createdAt: "created_at" } }
);

const Homework = mongoose.model("Homework", homeworkSchema);

export default Homework;
