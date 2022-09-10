const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect(
);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});

// setup API endpoints
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});