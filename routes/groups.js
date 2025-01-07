router.get("/", async (req, res) => {
  try {
    const { activityType, location } = req.query;

    // Build dynamic query
    const query = {};
    if (activityType) query.activityType = activityType;
    if (location) query.location = location;

    const groups = await Group.find(query);
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
