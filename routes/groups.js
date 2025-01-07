const express = require("express");
const multer = require("multer");
const router = express.Router();
const Group = require("../models/group");
const User = require("../models/user");

// Configure multer for uploading organizer profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // File destination
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique file name
});
const upload = multer({ storage });

// Fetch group details with organizer and members info
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "name email") // Populate member details (name and email only)
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
      organizer: group.organizer, // Organizer details
      members: group.members, // Group members
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

    // Add user to group's join request list (assuming group model has a 'joinRequests' field)
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found!" });
    }

    // Check if the user has already sent a join request
    if (group.joinRequests.includes(userId)) {
      return res.status(400).json({ message: "You have already sent a join request for this group." });
    }

    group.joinRequests.push(userId);
    await group.save();

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
      groupName,
      groupActivities,
      dailyGoals,
      phone,
      phoneVisibility,
      email,
      emailVisibility,
    } = req.body;

    // Validate required fields
    if (!groupName || !groupActivities) {
      return res.status(400).json({ success: false, message: "Group name and activities are required!" });
    }

    // Create new group
    const group = new Group({
      name: groupName,
      activities: groupActivities,
      dailyGoals,
      organizerPicture: req.file ? req.file.filename : "default-profile.jpg",
      contactDetails: {
        phone,
        phoneVisibility: phoneVisibility === "true",
        email,
        emailVisibility: emailVisibility === "true",
      },
      organizer: req.user.id, // Associate logged-in user as organizer
    });

    await group.save();
    res.status(201).json({ success: true, message: "Group created successfully!", group });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
