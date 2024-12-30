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


module.exports = router;
