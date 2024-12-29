const express = require("express");
const router = express.Router();
const Buddy = require("../models/Buddy");

router.post("/", async (req, res) => {
  try {
    const { name, age, hobby } = req.body;
    const newBuddy = new Buddy({ name, age, hobby });
    await newBuddy.save();
    res.status(201).json({ message: "Buddy created successfully!", buddy: newBuddy });
  } catch (error) {
    console.error("Error creating buddy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const buddies = await Buddy.find();
    res.status(200).json(buddies);
  } catch (error) {
    console.error("Error fetching buddies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
