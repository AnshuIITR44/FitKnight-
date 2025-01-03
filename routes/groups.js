const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const authenticateToken = require("../middleware/authenticateToken");

// Get All Groups Created by Organizer
router.get("/created", authenticateToken, async (req, res) => {
  try {
    // Fetch all groups created by the logged-in organizer
    const groups = await Group.find({ organizerId: req.user.id });

    if (!groups.length) {
      return res.status(200).json({ success: true, message: "No groups found.", groups: [] });
    }

    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Delete a Group
router.delete("/:groupId", authenticateToken, async (req, res) => {
  const { groupId } = req.params;

  try {
    // Ensure the group exists and belongs to the logged-in organizer
    const group = await Group.findOneAndDelete({ _id: groupId, organizerId: req.user.id });

    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found or unauthorized." });
    }

    res.status(200).json({ success: true, message: "Group deleted successfully.", group });
  } catch (error) {
    console.error("Error deleting group:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
