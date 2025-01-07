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

    res.json({
      username: user.username,
      profilePicture: user.profilePicture,
      fitnessGoals: user.fitnessGoals,
      workoutPreferences: user.workoutPreferences,
      availability: user.availability,
      about: user.about,
      fitnessHistory: user.fitnessHistory,
      phone: user.phone,
      email: user.email,
      contactVisibility: user.contactVisibility,
      role: user.role,
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
    about,
    fitnessHistory,
    phone,
    email,
    contactVisibility,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username: user.username,
      profilePicture: user.profilePicture,
      fitnessGoals: user.fitnessGoals,
      workoutPreferences: user.workoutPreferences,
      availability: user.availability,
      about: user.about,
      fitnessHistory: user.fitnessHistory,
      phone: user.contactVisibility?.phone ? user.phone : null,
      email: user.contactVisibility?.email ? user.email : null,
      contactVisibility: user.contactVisibility,
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

// Delete User (Optional Endpoint)
router.delete("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
