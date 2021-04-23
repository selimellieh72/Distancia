import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, maxlength: 41 },
    email: String,
    password: String,
    discipline: String,
    isTeacher: Boolean,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "GFS" },
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
