process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../src/db/config');

describe('Routes: domains', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /domains', ()=> {
    test('Should return array of domains', async () => {
      const res = await chai.request(server).get('/domains');
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
    });
  });
});
