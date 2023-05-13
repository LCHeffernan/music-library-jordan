const express = require("express");

const { createAlbum, readAllAlbums } = require("../controllers/album");

const router = express.Router();

router.route("/artists/:id/albums").post(createAlbum);

router.route("/albums").get(readAllAlbums);

module.exports = router;
