const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/auth", require("./routes/auth"));
app.use("/buddies", require("./routes/buddies"));
app.use("/groups", require("./routes/groups"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
