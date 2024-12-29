const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

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
