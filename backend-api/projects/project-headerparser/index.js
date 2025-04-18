// index.js
// where your node app starts

// initialize project and environment variables
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS for remote testing
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static files from 'public' directory
app.use(express.static("public"));

// route for the homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint to test basic functionality
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API endpoint for 'whoami'
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// listener for incoming requests
if (require.main === module) {
  const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });
}
