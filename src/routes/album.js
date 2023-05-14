const express = require("express");

const {
  createAlbum,
  readAllAlbums,
  readSingleAlbum,
} = require("../controllers/album");

const router = express.Router();

router.route("/artists/:id/albums").post(createAlbum);

router.route("/albums").get(readAllAlbums);

router.route("/albums/:id").get(readSingleAlbum);

module.exports = router;
