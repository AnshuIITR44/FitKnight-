const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload profile picture
router.post("/upload-profile-picture", authenticateToken, upload.single("profilePicture"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/${req.file.filename}` },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Profile picture updated successfully!" });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Fetch user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      username: user.username,
      profilePicture: user.profilePicture,
      about: user.about,
      fitnessGoals: user.fitnessGoals,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { about, fitnessGoals } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { about, fitnessGoals },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
