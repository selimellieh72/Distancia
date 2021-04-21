import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    grade: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
