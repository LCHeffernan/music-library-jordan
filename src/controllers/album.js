const db = require("../db/index");

exports.createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const artistID = req.params.id;

  const {
    rows: [album],
  } = await db.query(
    "INSERT INTO Albums (name, year, artistID) VALUES ($1, $2, $3) RETURNING *",
    [name, year, artistID]
  );
  res.status(201).json(album);
  console.log(album);
};

exports.readAllAlbums = async (req, res) => {
  try {
    const {
      rows: [album],
    } = await db.query("SELECT * FROM Albums");
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
