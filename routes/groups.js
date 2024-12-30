const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const Group = require("../models/group");
const router = express.Router();

router.get("/my-groups", authenticateToken, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id });
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching organizer's groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
