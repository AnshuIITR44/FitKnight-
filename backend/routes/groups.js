const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

// Create a group
router.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;

    // Create a new group
    const newGroup = new Group({ name, members });
    await newGroup.save();

    res.status(201).json({ message: "Group created successfully!", group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single group by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a group
router.put("/:id", async (req, res) => {
  try {
    const { name, members } = req.body;
    const group = await Group.findByIdAndUpdate(req.params.id, { name, members }, { new: true });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group updated successfully!", group });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a group
router.delete("/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully!" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
