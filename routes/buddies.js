const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authenticateToken");

// Search for Workout Buddies
router.get("/search", authenticateToken, async (req, res) => {
  const { proximity, availability } = req.query;

  try {
    const users = await User.find({
      role: "buddy",
      availability: availability || { $exists: true },
    });

    // Proximity filtering (mock logic, replace with real geolocation filtering)
    const filteredUsers = users.filter((user) => {
      // Example proximity check (replace with real distance logic)
      return proximity ? user.location.proximity <= Number(proximity) : true;
    });

    if (!filteredUsers.length) {
      return res.json({ success: true, message: "No buddies found." });
    }

    res.json({ success: true, buddies: filteredUsers });
  } catch (error) {
    console.error("Error searching buddies:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
