const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");
const authenticateToken = require("../middleware/authenticateToken");
const axios = require("axios");

// Distance Matrix API Key
const DISTANCE_MATRIX_API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your Google API Key

// Get Recommended Buddies
router.get("/buddies", authenticateToken, async (req, res) => {
  const { preferences, location } = req.query;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Get potential buddies
    let buddies = await User.find({ _id: { $ne: user._id } });

    // Filter based on preferences
    buddies = buddies.filter(
      (buddy) =>
        buddy.workoutPreferences === preferences || buddy.fitnessGoals === user.fitnessGoals
    );

    // Apply proximity filter using Distance Matrix API
    if (location) {
      const destinations = buddies.map((buddy) => buddy.location).join("|");
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location}&destinations=${destinations}&key=${DISTANCE_MATRIX_API_KEY}`;
      const response = await axios.get(url);

      const distances = response.data.rows[0].elements;
      buddies = buddies.filter((buddy, index) => distances[index].distance.value <= 10000); // 10 km
    }

    res.json({ success: true, buddies });
  } catch (error) {
    console.error("Error fetching buddies:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get Fitness Groups
router.get("/groups", authenticateToken, async (req, res) => {
  const { activityType, skillLevel } = req.query;
  try {
    const filters = {};
    if (activityType) filters.activityType = activityType;
    if (skillLevel) filters.skillLevel = skillLevel;

    const groups = await Group.find(filters);
    res.json({ success: true, groups });
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
