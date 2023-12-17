const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes (register routes before the server starts listening)
app.use("/api", blogRoute);
app.use("/api", authRoute);

const port = process.env.PORT || 7000;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connection success");
    // Start the server after successful DB connection
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process with failure
  }
};

// Connect to DB then listen
connectDB();
