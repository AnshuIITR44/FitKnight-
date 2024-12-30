const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection using the .env file for the connection string
mongoose.connect("mongodb+srv://anshumalaiyaiitr:AnshuIITR%40446@cluster0.i5kz9.mongodb.net/FitKnight?retryWrites=true&w=majority&appName=Cluster0", { connectTimeoutMS: 30000 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Importing route files (Ensure these files exist in the routes folder)
const buddiesRoutes = require("./routes/buddies");
const groupsRoutes = require("./routes/groups");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); 



// Use routes
app.use("/buddies", buddiesRoutes);
app.use("/groups", groupsRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes); 

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Generic error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
