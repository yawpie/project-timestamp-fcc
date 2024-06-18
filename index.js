// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function parseDate(dateString) {
  let date = new Date(dateString);
  if (isNaN(date)) {
    throw new Error("Invalid Date");
  }
  return date;
}

app.get("/api/", (req, res) => {
  try {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  } catch (err) {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/:date", (req, res) => {
  const date_string = req.params.date;

  try {
    const send = Date.parse(date_string);

    if (date_string.includes("-")) {
      res.json({ unix: send, utc: new Date(send).toUTCString() });
    } else {
      res.json({
        unix: parseInt(date_string),
        utc: new Date(parseInt(date_string)).toUTCString(),
      });
    }
  } catch (err) {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
