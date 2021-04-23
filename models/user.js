import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    googleId: String,
    email: String,
    password: String,
    discipline: String,
    isTeacher: Boolean,
    profile: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

export default User;
