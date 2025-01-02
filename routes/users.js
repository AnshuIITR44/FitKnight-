const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

// Get User Profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Clean up response
    const sanitizedUser = {
      username: user.username,
      profilePicture: user.profilePicture,
      fitnessGoals: user.fitnessGoals || "Not set",
      workoutPreferences: user.workoutPreferences || "Not set",
      availability: user.availability || "Not set",
      role: user.role,
      roleDetails: user.roleDetails,
    };

    res.json(sanitizedUser);
  } catch (error) {
    console.error("Error fetching user profile:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update User Profile
router.put("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { fitnessGoals, workoutPreferences, availability, profilePicture, roleDetails } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fitnessGoals: fitnessGoals || "Not set",
        workoutPreferences: workoutPreferences || "Not set",
        availability: availability || "Not set",
        profilePicture, // Allow updating profile picture
        roleDetails, // Allow updating role details
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Clean up response
    const sanitizedUser = {
      username: updatedUser.username,
      profilePicture: updatedUser.profilePicture,
      fitnessGoals: updatedUser.fitnessGoals,
      workoutPreferences: updatedUser.workoutPreferences,
      availability: updatedUser.availability,
      role: updatedUser.role,
      roleDetails: updatedUser.roleDetails,
    };

    res.json({ success: true, message: "Profile updated successfully!", user: sanitizedUser });
  } catch (error) {
    console.error("Error updating user profile:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
