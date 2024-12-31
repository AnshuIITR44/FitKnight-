const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

// Update user profile
router.put("/", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Extract user ID from the token
  const { fitnessGoals, workoutPreferences, availability } = req.body;

  try {
    // Validate inputs (optional)
    if (!fitnessGoals && !workoutPreferences && !availability) {
      return res.status(400).json({ success: false, message: "No updates provided." });
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fitnessGoals: fitnessGoals || undefined,
        workoutPreferences: workoutPreferences || undefined,
        availability: availability || undefined,
      },
      { new: true, runValidators: true } // Return the updated document and apply validation
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
