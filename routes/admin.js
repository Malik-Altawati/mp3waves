const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
// const Formidable = require("formidable");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var uniqid = require("uniqid");
var id;

// const form = new Formidable({ multiples: true });
// const cloudinary = require("cloudinary");
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });
///// upload media function
function uploadMedia(req, res) {
  // generting random id
  id = uniqid();

  // saving the song
  const tempPath1 = req.files[0].path;
  var songExtention = "." + req.files[0].originalname.split(".")[1];
  var targetPath1 = path.join(__dirname, `../uploads/${id + songExtention}`);
  var songPath = `${id + songExtention}`;
  fs.rename(tempPath1, targetPath1, (err) => {
    if (err) console.log(err, "This is an error");
  });

  // saving the img
  if (req.files[1]) {
    const tempPath2 = req.files[1].path;
    var imgExtention = "." + req.files[1].originalname.split(".")[1];
    var targetPath2 = path.join(__dirname, `../uploads/${id + imgExtention}`);
    var imgPath = `${id + imgExtention}`;
    fs.rename(tempPath2, targetPath2, (err) => {
      if (err) console.log(err, "This is an error");
    });
  }
  // returning links
  var getlinks = { song: songPath, img: imgPath || "noImage.png" };
  return getlinks;
}

/// upload media configurations
const upload = multer({
  dest: "../../uploads",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

///// upload a Song
router.post("/upload", upload.any(0), (req, res) => {
  // res.setHeader("Content-Type", "text/html");
  var title = req.body.title;
  var artist = req.body.artist || "Uknown Artist";
  var save = uploadMedia(req, res);
  var song_link = save.song;
  var img_link = save.img;
  Song.create({
    title,
    song_link,
    img_link,
    artist,
  })
    .then((song) => {
      return res.status(200).send(song);
    })
    .catch((err) => {
      return console.log(err);
      //  res.sendStatus(503)
    });
});

///// delete a Song
router.get("/delete", (req, res) => {
  var { id } = req.query;
  Song.destroy({ where: { id: id } })
    .then((data) => {
      if (data === 1) {
        console.log("Deleted successfully");
      }
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      // res.sendStatus(503)
    });
});

///// update Song
router.post("/update", (req, res) => {
  var { id, title, artist } = req.body;
  Song.update({ title, artist }, { where: { id } })
    .then((data) => {
      if (data === 1) {
        console.log("Updated successfully");
      }
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      // res.sendStatus(503)
    });
});

module.exports = router;
