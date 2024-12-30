const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const Buddy = require("../models/buddy");
const router = express.Router();

// Fetch profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.user.id);
    if (!buddy) return res.status(404).json({ error: "Buddy not found." });

    res.json(buddy);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, about, fitnessGoals } = req.body;

    const updatedBuddy = await Buddy.findByIdAndUpdate(
      req.user.id,
      { name, about, fitnessGoals },
      { new: true }
    );

    if (!updatedBuddy) return res.status(404).json({ error: "Buddy not found." });

    res.json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update privacy settings
router.put("/privacy", authenticateToken, async (req, res) => {
  try {
    const { privacySettings } = req.body;

    const updatedBuddy = await Buddy.findByIdAndUpdate(
      req.user.id,
      { privacySettings },
      { new: true }
    );

    if (!updatedBuddy) return res.status(404).json({ error: "Buddy not found." });

    res.json({ success: true, message: "Privacy settings updated successfully!" });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
