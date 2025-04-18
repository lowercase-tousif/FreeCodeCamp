let express = require("express");
const bodyParser = require("body-parser");
let app = express();

require("dotenv").config();
let filePath = __dirname + "/views/index.html";

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/name", (req, res, next) => {
  let first = req.query.first;
  let last = req.query.last;
  res.json({ name: `${first} ${last}` });
});

app.post("/name", (req, res) => {
  let string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

app.get("/", (req, res) => {
  res.sendFile(filePath);
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res, next) => {
  let word = req.params.word;
  res.json({ echo: word });
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

console.log("Hello World");

module.exports = app;
