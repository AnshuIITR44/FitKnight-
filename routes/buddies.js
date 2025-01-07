router.post("/", async (req, res) => {
  try {
    const { activityType, skillLevel, location } = req.body;

    // Build dynamic query based on filters
    const query = {};
    if (activityType) query.activityType = activityType;
    if (skillLevel) query.skillLevel = skillLevel;
    if (location) query.location = location;

    const buddies = await Buddy.find(query);
    res.status(200).json(buddies);
  } catch (error) {
    console.error("Error fetching buddies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
