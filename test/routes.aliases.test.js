process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../src/db/config');

describe('Routes: aliases', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /aliases', ()=> {
    test('Should return array of aliases', async () => {
      const res = await chai.request(server).get('/aliases');
      const aliases = [
        { id: 1, srcUsr: 'miller', srcDom: 'example.com', dstUsr: 'm_alias', dstDom: 'other.com', enabled: 1 },
        { id: 2, srcUsr: 'smith', srcDom: 'example.com', dstUsr: 's_alias', dstDom: 'other.com', enabled: 0 },
        { id: 3, srcUsr: 'baker', srcDom: 'example.com', dstUsr: 'b_alias', dstDom: 'other.com', enabled: 0 }
        ];
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(aliases);
    });
  });
});
