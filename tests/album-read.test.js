const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("read album", () => {
  let artists;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["Kasabian", "rock"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["Chemical Brothers", "dance"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["Stevie Wonder", "motown"]
      ),
    ]);
    artists = responses.map(({ rows }) => rows[0]);

    const albums = [
      {
        artist: "Kasabian",
        name: "Velociraptor",
        year: 2011,
      },
      {
        artist: "Chemical Brothers",
        name: "Brotherhood",
        year: 2008,
      },
      {
        artist: "Stevie Wonder",
        name: "Innervisions",
        year: 1973,
      },
    ];
    artists.forEach(async (artist) => {
      let n = 0;
      let id;
      while (n < albums.length) {
        if (artist.name === albums[n].artist) {
          id = artist.id;
          await request(app).post(`/artists/${id}/albums`).send({
            name: albums[n].name,
            year: albums[n].year,
          });
          return;
        } else {
          n += 1;
        }
      }
    });
  });

  describe("GET /albums", () => {
    it("reads all albums in the table", async () => {
      const { status, body } = await request(app).get("/albums").send();
      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      console.log(body);
    });
  });
});
