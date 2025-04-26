require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("dns");
const urlParser = require("url");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Edited by tousif tasrik (21.04.2025)

// Dnslookup and checking if the url is valid or not
function checkValidUrl(userURL){
  // const hostname = urlParser.parse(userURL).hostname;
  const hostname = new URL(userURL).hostname;

  // dns lookup functionality
  dns.lookup(hostname, (err, address, family) => {
    if(err){
      console.log("Invalid");
    }else{
      console.log("Valid");
    }
  })
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
