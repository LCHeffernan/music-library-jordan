const express = require("express");

const {
  createArtist,
  readAllArtists,
  readSingleArtist,
  replaceArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artist");

const router = express.Router();

router.route("/artists").post(createArtist);

router.route("/artists").get(readAllArtists);

router.route("/artists/:id").get(readSingleArtist);

router.route("/artists/:id").put(replaceArtist);

router.route("/artists/:id").patch(updateArtist);

router.route("/artists/:id").delete(deleteArtist);

module.exports = router;
