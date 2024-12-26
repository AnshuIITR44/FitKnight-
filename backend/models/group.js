const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  activityType: String,
  location: String,
  schedule: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Group", groupSchema);
