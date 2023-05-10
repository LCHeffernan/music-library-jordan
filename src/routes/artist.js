const express = require("express");

const {
  createArtist,
  readAllArtists,
  readSingleArtist,
  replaceArtist,
  updateArtist,
} = require("../controllers/artist");

const router = express.Router();

router.route("/artists").post(createArtist);

router.route("/artists").get(readAllArtists);

router.route("/artists/:id").get(readSingleArtist);

router.route("/artists/:id").put(replaceArtist);

router.route("/artists/:id").patch(updateArtist);
module.exports = router;
