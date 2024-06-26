require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/todos", todoRoutes);

// Connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //Listen for Requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB on Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
