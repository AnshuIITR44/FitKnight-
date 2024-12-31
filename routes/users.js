const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

// Update user profile
router.put("/", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Extract user ID from the token
  const { fitnessGoals, workoutPreferences, availability } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fitnessGoals, workoutPreferences, availability },
      { new: true } // Return the updated document
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
