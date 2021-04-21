import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
