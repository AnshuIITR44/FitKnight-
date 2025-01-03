const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const JoinRequest = require("../models/joinRequest");
const authenticateToken = require("../middleware/authenticateToken");

// Get Join Requests for Organizer's Groups
router.get("/", authenticateToken, async (req, res) => {
  try {
    const requests = await JoinRequest.find({ organizerId: req.user.id });
    if (!requests.length) {
      return res.json({ success: true, message: "No join requests found." });
    }
    res.json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching join requests:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Approve a Join Request
router.post("/:requestId/approve", authenticateToken, async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await JoinRequest.findByIdAndDelete(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    // Add user to the group
    await Group.findByIdAndUpdate(request.groupId, { $push: { members: request.userId } });
    res.json({ success: true, message: "Request approved and user added to group." });
  } catch (error) {
    console.error("Error approving join request:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Reject a Join Request
router.post("/:requestId/reject", authenticateToken, async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await JoinRequest.findByIdAndDelete(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }
    res.json({ success: true, message: "Request rejected successfully." });
  } catch (error) {
    console.error("Error rejecting join request:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
