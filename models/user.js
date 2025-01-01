const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "default-profile.jpg" },
  role: { type: String, enum: ["buddy", "organizer"], required: true },
  fitnessGoals: { type: String, default: "Not set" },
  workoutPreferences: { type: String, default: "Not set" },
  availability: { type: String, default: "Not set" },
  roleDetails: { type: Object, default: {} },
});

module.exports = mongoose.model("User", userSchema);
