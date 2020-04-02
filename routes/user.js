const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Song = require("../models/Song");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

///// get all Songs
router.get("/", (req, res) =>
  Song.findAll({ limit: 15, order: [["id", "DESC"]] })
    .then(Songs => {
      res.status(200).send(Songs);
    })
    .catch(err => {
      console.log(err);
      //  res.sendStatus(503)
    })
);

///// search for a Song
router.get("/search", (req, res) => {
  const { query } = req.query;
  Song.findAll({
    where: { title: { [Op.like]: "%" + query + "%" } },
    limit: 15,
    order: [["id", "DESC"]]
  })
    .then(Songs => {
      res.status(200).send(Songs);
    })
    .catch(err => {
      console.log(err);
      //  res.sendStatus(503)
    });
});

///// get a song
router.get("/play", (req, res) => {
  const { id } = req.query;
  Song.findOne({
    where: {
      id
    }
  })
    .then(Songs => {
      res.status(200).send(Songs);
    })
    .catch(err => {
      console.log(err);
      //  res.sendStatus(503)
    });
});

module.exports = router;
