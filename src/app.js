if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// 404 Not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Route not found" });
});

// Global Error Handler
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
