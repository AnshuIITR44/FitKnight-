const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Importing routes
const authRoutes = require("C:\Users\ANSHU\OneDrive\Documents\FitKnight\backend\routes\auth.js");
const buddiesRoutes = require("C:\Users\ANSHU\OneDrive\Documents\FitKnight\backend\routes\buddies.js");
const groupsRoutes = require("C:\Users\ANSHU\OneDrive\Documents\FitKnight\backend\routes\groups.js");

// Using routes
app.use("/auth", authRoutes);
app.use("/buddies", buddiesRoutes);
app.use("/groups", groupsRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
