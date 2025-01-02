const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");
const { body, validationResult } = require("express-validator");

// Serve default fallback for profile picture
const DEFAULT_PROFILE_PICTURE = "default-profile.jpg";

// Get User Profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const sanitizedUser = {
      username: user.username,
      profilePicture: user.profilePicture || DEFAULT_PROFILE_PICTURE, // Fallback to default
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
router.put(
  "/",
  authenticateToken,
  [
    body("fitnessGoals").optional().isString().withMessage("Fitness goals must be a string."),
    body("workoutPreferences").optional().isString().withMessage("Preferences must be a string."),
    body("availability").optional().isString().withMessage("Availability must be a string."),
    body("profilePicture").optional().isString().withMessage("Profile picture must be a valid path."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

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

      const sanitizedUser = {
        username: updatedUser.username,
        profilePicture: updatedUser.profilePicture || DEFAULT_PROFILE_PICTURE, // Ensure fallback
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
  }
);

module.exports = router;
