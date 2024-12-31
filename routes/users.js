const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

// Get User Profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found!" });

    res.json({
      username: user.username,
      profilePicture: user.profilePicture,
      fitnessGoals: user.fitnessGoals || "Not set",
      workoutPreferences: user.workoutPreferences || "Not set",
      availability: user.availability || "Not set",
      role: user.role,
      roleDetails: user.roleDetails,
      fitnessHistory: user.fitnessHistory || "No activities logged yet",
      contactDetails: user.contactDetails,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update User Profile
router.put("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {
    fitnessGoals,
    workoutPreferences,
    availability,
    contactDetails,
    fitnessHistory,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fitnessGoals: fitnessGoals || "Not set",
        workoutPreferences: workoutPreferences || "Not set",
        availability: availability || "Not set",
        fitnessHistory: fitnessHistory || "No activities logged yet",
        contactDetails: {
          phone: contactDetails.phone || "",
          email: contactDetails.email || "",
          showPhone: contactDetails.showPhone || false,
          showEmail: contactDetails.showEmail || false,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
