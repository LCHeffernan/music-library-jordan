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
  console.log(album);
  res.status(201).json(album);
};
