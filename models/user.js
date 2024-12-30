const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["buddy", "organizer"], required: true },
  profilePicture: { type: String, default: "" }, // Path to profile picture
  about: { type: String, default: "" },
  fitnessGoals: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
