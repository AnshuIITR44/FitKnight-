const express = require("express");
const router = express.Router();
const Group = require("../models/group");

// Create a Group
router.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Group name is required!" });
    }

    const newGroup = new Group({ name, members: members || [] });
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully!", group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch Groups (unchanged)
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
