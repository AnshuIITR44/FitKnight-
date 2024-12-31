const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "default-profile.jpg" },
    role: { type: String, enum: ["buddy", "organizer"], required: true },
    fitnessGoals: { type: String, default: "Not set" },
    workoutPreferences: { type: String, default: "Not set" },
    availability: { type: String, default: "Not set" },
    roleDetails: {
      type: Object,
      default: {}, // Store additional details based on the role
    },

    // Contact Details
    contactDetails: {
      phone: { type: String, default: "" }, // Phone number
      email: { type: String, default: "" }, // Email address
      showPhone: { type: Boolean, default: false }, // Visibility for phone
      showEmail: { type: Boolean, default: false }, // Visibility for email
    },

    // Fitness History
    fitnessHistory: {
      type: String,
      default: "No activities logged yet", // Default message for fitness history
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
