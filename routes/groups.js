const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");

// Fetch group details
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members") // Populate member details
      .populate("organizer", "name email phone"); // Populate organizer details

    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    res.json({
      name: group.name,
      activityType: group.activityType,
      schedule: group.schedule,
      location: group.location,
      description: group.description,
      organizer: group.organizer,
      members: group.members,
    });
  } catch (error) {
    console.error("Error fetching group details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Join group request
router.post("/join", async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user.id; // Assumes user authentication middleware

    // Add logic to handle join requests (e.g., send notification to organizer)
    res.json({ message: "Join request sent successfully!" });
  } catch (error) {
    console.error("Error handling join request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new group
router.post("/", upload.single("organizerPicture"), async (req, res) => {
  try {
    const {
      organizerName,
      groupActivities,
      dailyGoals,
      phone,
      phoneVisibility,
      email,
      emailVisibility,
    } = req.body;

    const group = new Group({
      name: organizerName,
      activities: groupActivities,
      dailyGoals,
      organizerPicture: req.file ? req.file.filename : "default-profile.jpg",
      contactDetails: {
        phone,
        phoneVisibility: phoneVisibility === "true",
        email,
        emailVisibility: emailVisibility === "true",
      },
    });

    await group.save();
    res.status(201).json({ success: true, message: "Group created successfully!", group });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
