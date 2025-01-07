const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "default-profile.jpg" },
  role: { type: String, enum: ["buddy", "organizer"], required: true },
  fitnessGoals: { type: String, default: "Not set" },
  workoutPreferences: { type: String, default: "Not set" },
  availability: { type: String, default: "Not set" },
  about: { type: String, default: "Not set" },
  fitnessHistory: { type: [String], default: [] },
  phone: { type: String, default: "Not set" },
  email: { type: String, default: "Not set" },
  contactVisibility: {
    phone: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("User", userSchema);
