const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "default-profile.jpg" },
  role: { type: String, enum: ["buddy", "organizer"], required: true },
  roleDetails: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("User", userSchema);
