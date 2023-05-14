const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Read Albums", () => {
  let artists;
  let albums;
  beforeEach(async () => {
    const artistData = await Promise.all([
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["Fleetwood Mac", "rock"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["Chemical Brothers", "dance"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
        ["The Avalanches", "electronic"]
      ),
    ]);
    artists = artistData.map(({ rows }) => rows[0]);

    const albumData = await Promise.all([
      db.query(
        "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
        ["Rumours", 1977, artists[0].id]
      ),
      db.query(
        "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
        ["Brotherhood", 2008, artists[1].id]
      ),
      db.query(
        "INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *",
        ["Wildflower", 2016, artists[2].id]
      ),
    ]);
    albums = albumData.map(({ rows }) => rows[0]);
  });

  describe("GET /albums", () => {
    it("returns all artist records in the database", async () => {
      const { status, body } = await request(app).get("/albums").send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);
      expect(body[0].name).to.equal(albums[0].name);
      expect(body[1].year).to.equal(albums[1].year);
      expect(body[2].artistid).to.equal(artists[2].id);
    });

    describe("GET /albums/{id}", () => {
      it("returns the correct album when passed an id", async () => {
        const { status, body } = await request(app)
          .get(`/albums/${albums[0].id}`)
          .send();
        expect(status).to.equal(200);
        expect(body.name).to.equal(albums[0].name);
      });

      it("returns a 404 if the album does not exist", async () => {
        const { status, body } = await request(app)
          .get("/albums/123456789")
          .send();

        expect(status).to.equal(404);
        expect(body.message).to.equal("album 123456789 does not exist");
      });
    });
  });
});
