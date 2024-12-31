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
    roleDetails: { type: Object, default: {} },

    // Contact Details
    contactDetails: {
      phone: { type: String, default: "" }, // Phone number
      email: { type: String, default: "" }, // Email address
      showPhone: { type: Boolean, default: false }, // Visibility for phone
      showEmail: { type: Boolean, default: false }, // Visibility for email
    },

    // Fitness History
    fitnessHistory: { type: String, default: "No activities logged yet" },

    // Timestamps for createdAt and updatedAt
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
