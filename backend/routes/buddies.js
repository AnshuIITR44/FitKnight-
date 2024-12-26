const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  const buddies = await User.find({ role: "buddy" });
  res.json(buddies);
});

module.exports = router;
