const express = require("express");

const {
  createAlbum,
  readAllAlbums,
  readSingleAlbum,
  replaceAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/album");

const router = express.Router();

router.route("/artists/:id/albums").post(createAlbum);

router.route("/albums").get(readAllAlbums);

router.route("/albums/:id").get(readSingleAlbum);

router.route("/albums/:id").put(replaceAlbum);

router.route("/albums/:id").patch(updateAlbum);

router.route("/albums/:id").delete(deleteAlbum);

module.exports = router;
