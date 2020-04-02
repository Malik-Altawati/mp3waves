const Sequelize = require("sequelize");
const db = require("../config/database");

db.sync()
  .then(() => console.log("Songs table is up"))
  .catch(err => console.log(`Error### ${err}`));

const Song = db.define("song", {
  title: {
    type: Sequelize.STRING
  },
  img_link: {
    type: Sequelize.STRING
  },
  song_link: {
    type: Sequelize.STRING
  },
  artist: {
    type: Sequelize.STRING
  }
});

module.exports = Song;
