const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");
const router = express.Router();

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      username: user.username,
      fitnessGoals: user.fitnessGoals,
      preferences: user.preferences,
      availability: user.availability,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { fitnessGoals, preferences, availability } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fitnessGoals, preferences, availability },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
