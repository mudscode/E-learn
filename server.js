// The Server

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const logger = require("morgan");
const { urlencoded } = require("body-parser");
const dotenv = require("dotenv").config();

// App
const app = express();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(logger("dev"));

// Mongoose Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb Connected.");
  })
  .catch((error) => {
    console.log(`An error occured while connecteing ${error}`);
  });

// Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
