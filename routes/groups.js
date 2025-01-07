const express = require("express");
const router = express.Router();
const Group = require("../models/group");

router.get("/", async (req, res) => {
  try {
    const { activityType, location } = req.query;

    // Build dynamic query
    const query = {};
    if (activityType) query.activityType = activityType;
    if (location) query.location = location;

    const groups = await Group.find(query);
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;
    const newGroup = new Group({ name, members });
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully!", group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
