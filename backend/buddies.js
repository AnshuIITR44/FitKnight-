const express = require("express");
const router = express.Router();
const Buddy = require("../models/Buddy");

// Create a buddy
router.post("/", async (req, res) => {
  try {
    const { name, age, hobby } = req.body;

    // Create a new buddy
    const newBuddy = new Buddy({ name, age, hobby });
    await newBuddy.save();

    res.status(201).json({ message: "Buddy created successfully!", buddy: newBuddy });
  } catch (error) {
    console.error("Error creating buddy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all buddies
router.get("/", async (req, res) => {
  try {
    const buddies = await Buddy.find();
    res.status(200).json(buddies);
  } catch (error) {
    console.error("Error fetching buddies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single buddy by ID
router.get("/:id", async (req, res) => {
  try {
    const buddy = await Buddy.findById(req.params.id);
    if (!buddy) {
      return res.status(404).json({ message: "Buddy not found" });
    }
    res.status(200).json(buddy);
  } catch (error) {
    console.error("Error fetching buddy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a buddy
router.put("/:id", async (req, res) => {
  try {
    const { name, age, hobby } = req.body;
    const buddy = await Buddy.findByIdAndUpdate(req.params.id, { name, age, hobby }, { new: true });

    if (!buddy) {
      return res.status(404).json({ message: "Buddy not found" });
    }
    res.status(200).json({ message: "Buddy updated successfully!", buddy });
  } catch (error) {
    console.error("Error updating buddy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a buddy
router.delete("/:id", async (req, res) => {
  try {
    const buddy = await Buddy.findByIdAndDelete(req.params.id);
    if (!buddy) {
      return res.status(404).json({ message: "Buddy not found" });
    }
    res.status(200).json({ message: "Buddy deleted successfully!" });
  } catch (error) {
    console.error("Error deleting buddy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
