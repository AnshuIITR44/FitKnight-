const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Group = require("../models/group");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password, role, group } = req.body;

    // Validate role
    if (!["buddy", "organizer"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role provided!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();

    // If the user is an organizer, create a group
    if (role === "organizer" && group) {
      const newGroup = new Group({
        name: group.name,
        activityType: group.activityType,
        location: group.location,
        schedule: group.schedule,
        members: [newUser._id], // Add the user as the initial member
      });
      await newGroup.save();
    }

    res.status(201).json({ success: true, message: "User signed up successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
