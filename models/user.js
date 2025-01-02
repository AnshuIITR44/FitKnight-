const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username for each user
  password: { type: String, required: true }, // User password (hashed for security)
  profilePicture: { type: String, default: "default-profile.jpg" }, // Path or URL to the profile picture
  role: { type: String, enum: ["buddy", "organizer"], required: true }, // User role (buddy or organizer)
  fitnessGoals: { type: String, default: "Not set" }, // User's fitness goals
  workoutPreferences: { type: String, default: "Not set" }, // User's workout preferences
  availability: { type: String, default: "Not set" }, // User's availability
  roleDetails: { type: Object, default: {} }, // Additional details specific to the user's role
  location: {
    type: {
      lat: { type: Number, required: true }, // Latitude for proximity filter
      lng: { type: Number, required: true }, // Longitude for proximity filter
    },
    required: true,
  }, // Location data for proximity-based matching
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the user was created
});

module.exports = mongoose.model("User", userSchema);
