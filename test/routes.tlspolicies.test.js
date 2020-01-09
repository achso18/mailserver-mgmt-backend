process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../src/db/config');

describe('Routes: tlspolicies', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /tlspolicies', ()=> {
    test('Should return array of tlspolicies', async () => {
      const res = await chai.request(server).get('/tlspolicies');
      const tlspolicies = [
        { id: 1, domain: 'google.com', policy: 'encrypt', params: null },
        { id: 2, domain: 'my.dom', policy: 'none', params: null },
        { id: 3, domain: 'microsoft', policy: 'secure', params: null }
      ];
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(tlspolicies);
    });
  });

});
