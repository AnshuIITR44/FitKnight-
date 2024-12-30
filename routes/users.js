const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");

// Get user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({
      username: user.username,
      fitnessGoals: user.fitnessGoals,
      workoutPreferences: user.workoutPreferences,
      availability: user.availability,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Update user profile
router.put("/", authenticateToken, async (req, res) => {
  const { fitnessGoals, workoutPreferences, availability } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fitnessGoals, workoutPreferences, availability },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
