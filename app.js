const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

//Database
const db = require("./config/database");
// test db
db.authenticate()
  .then(() => console.log("db connected..."))
  .catch((err) => console.log(`ERROR### ${err}`));

const app = express();
app.use(express.static(__dirname + "/public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.get("/", (req, res) => res.send("hi"));

// user routes
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
app.get("/play", (req, res) => {
  var file = path.join(__dirname, `/public/play.html`);
  res.sendFile(file);
});
app.get("/admin", (req, res) => {
  var file = path.join(__dirname, `public/admin/upload.html`);
  res.sendFile(file);
});

app.get("/file", (req, res) => {
  var song = path.join(__dirname, `uploads/${req.query.path}`);
  res.sendFile(song);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
