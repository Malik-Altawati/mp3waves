const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Formidable = require("formidable");
require("dotenv").config();

const form = new Formidable({ multiples: true });
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
///// upload a Song
router.post("/upload", (req, res) => {
  res.setHeader("Content-Type", "text/html");

  form.parse(req, (err, fields, files) => {
    var title = fields.title;
    var artist = fields.artist || "Uknown Artist";
    var song = files.song;
    var img = files.img;
    var song_link;
    var img_link;

    let upload_img = () => {
      return new Promise((Resolve, Reject) => {
        cloudinary.v2.uploader.upload(img.path, function(error, result) {
          if (error) {
            return res.sendStatus(503);
          }
          img_link = result.url;
          Resolve();
        });
      });
    };

    let upload_audio = () => {
      return new Promise((Resolve, Reject) => {
        cloudinary.v2.uploader.upload(
          song.path,
          { resource_type: "video" },
          function(error, result) {
            if (error) {
              return res.sendStatus(503);
            }
            song_link = result.url;
            Resolve();
          }
        );
      });
    };

    let finish = async () => {
      await upload_audio();
      await upload_img();
      Song.create({
        title,
        song_link,
        img_link,
        artist
      })
        .then(song => {
          return res.status(200).send(song);
        })
        .catch(err => {
          return console.log(err);
          //  res.sendStatus(503)
        });
    };

    finish();
  });
});

///// delete a Song
router.get("/delete", (req, res) => {
  var { id } = req.query;
  Song.destroy({ where: { id: id } })
    .then(data => {
      if (data === 1) {
        console.log("Deleted successfully");
      }
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      // res.sendStatus(503)
    });
});

///// update Song
router.post("/update", (req, res) => {
  var { id, title, artist } = req.body;
  Song.update({ title, artist }, { where: { id } })
    .then(data => {
      if (data === 1) {
        console.log("Updated successfully");
      }
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      // res.sendStatus(503)
    });
});

module.exports = router;
