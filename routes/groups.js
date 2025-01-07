const express = require("express");
const router = express.Router();
const Group = require("../models/group");

// Update group details
router.put("/:id", async (req, res) => {
  try {
    const { activityType, location, schedule } = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { activityType, location, schedule },
      { new: true }
    );

    if (!updatedGroup) return res.status(404).json({ message: "Group not found!" });
    res.json({ success: true, message: "Group updated successfully!", group: updatedGroup });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch join requests
router.get("/requests", async (req, res) => {
  try {
    // Dummy data for join requests
    const requests = [
      { _id: "1", username: "JohnDoe", groupName: "Yoga Group" },
      { _id: "2", username: "JaneDoe", groupName: "Running Club" },
    ];
    res.json(requests);
  } catch (error) {
    console.error("Error fetching join requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle join requests
router.post("/requests/:id", async (req, res) => {
  const { approve } = req.body;

  try {
    // Process the request based on the `approve` value
    // Example logic: Update group membership
    res.json({ success: true, message: `Request ${approve ? "approved" : "rejected"}!` });
  } catch (error) {
    console.error("Error processing join request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
