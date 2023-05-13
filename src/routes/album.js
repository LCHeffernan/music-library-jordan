const express = require("express");

const { createAlbum } = require("../controllers/album");

const router = express.Router();

router.route("/artists/:id/albums").post(createAlbum);

module.exports = router;
