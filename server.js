const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Importing route files
const buddiesRoutes = require("./routes/buddies");
const groupsRoutes = require("./routes/groups");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

// Use routes
app.use("/buddies", buddiesRoutes);
app.use("/groups", groupsRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Serve static files (e.g., uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found." });
});

// Generic error handler
app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(error.status || 500).json({ message: error.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
