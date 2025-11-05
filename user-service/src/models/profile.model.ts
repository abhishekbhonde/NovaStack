import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    bio: String,
    location: String,
    website: String
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
