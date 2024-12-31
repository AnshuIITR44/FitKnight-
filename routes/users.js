const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

// Fetch user profile
outer.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update user profile
router.put("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { fitnessGoals, workoutPreferences, availability } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fitnessGoals: fitnessGoals || undefined,
        workoutPreferences: workoutPreferences || undefined,
        availability: availability || undefined,
      },
      { new: true, runValidators: true } // Return updated document and validate inputs
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
