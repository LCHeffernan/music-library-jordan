const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let artist;
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['Oasis', 'Rock']
    );
    artist = rows[0];

    const albumData = await db.query(
      'INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *',
      ['Definitely Maybe', 1994, artist.id]
    );

    album = albumData.rows[0];
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'Definitely Maybe',
        year: 1994,
        artistid: artist.id,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
