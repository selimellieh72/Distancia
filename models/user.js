import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    discipline: String,
    isTeacher: Boolean,
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
