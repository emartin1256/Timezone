const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
fs = require("fs");
var convert = require("xml-js");
var { json } = require("body-parser");
var data = fs.readFileSync("./timezones.xml", "utf8");
json = convert.xml2json(data, { compact: true, spaces: 2 });
const array = JSON.parse(String(json)).TimeZones.TimeZone;
var result = [];
var count = 1;
array.forEach(function (item) {
  var arr = item.Name._text
    .slice(0, -10)
    .replace(/\s*\(.*?\)\s*/g, "")
    .split(", ");
  if (item.Hours._text.includes("-")) {
  } else {
    item.Hours._text = "+" + item.Hours._text;
  }

  arr.forEach(function (location) {
    result.push({
      Id: count,
      Name: location,
      Hours: item.Hours._text,
      Mins: item.Mins._text,
      Secs: item.Secs._text,
    });
    count += 1;
  });
});
result.sort(function (a, b) {
  a = a.Name.toLowerCase();
  b = b.Name.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
});
console.log(result);
const app = express();
const port = process.env.PORT || 4041;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (_, res) => {
  res.send("Your Express App");
});

app.get("/zones", (_, res) => {
  res.send(result);
});

app.get("/user/:name", (req, res) => {
  const { name } = req.params;
  const zone = zones.filter((zone) => user.name === name)[0];
  res.json({ ok: true, zone });
});

app.listen(port, () => {
  console.log`server is running on port: ${port}`;
});
