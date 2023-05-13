const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("create album", () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
      ["Oasis", "Rock"]
    );
    artist = rows[0];
  });
  describe("POST /artists/:id/albums", () => {
    it("creates a new album for a specified artist", async () => {
      const id = artist.id;
      const { status, body } = await request(app)
        .post(`/artists/${id}/albums`)
        .send({
          name: "Definitely Maybe",
          year: 1994,
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal("Definitely Maybe");
      expect(body.year).to.equal(1994);

      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
      expect(artistData.name).to.equal("Definitely Maybe");
      expect(artistData.year).to.equal(1994);
      expect(artistData.artistid).to.equal(id);
    });
  });
});
