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
      const domains = [ { id: 1, domain: 'example.com' },
                        { id: 2, domain: 'my.dom' }
                      ];
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(domains);
    });
  });

  describe('GET /domain/:id', () => {
    test('Should return a single domain', async () => {
      const domain = { id: 1, domain: 'example.com'};
      const res = await chai.request(server).get('/domain/1');
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(domain);
    });
  });

  describe('POST /domain', () => {
    test('Should return single post after insert', async () => {
      const newDom = { domain: newdomain.com };
      const res = await chai.request(server).post('/domain').send(newDom);

      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(newDom);
    });

    test('Should return error status message, when body invalid', async () => {
      const res = await chai.request(server).post('/domain').send({ domain: '' });

      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
    });
  });

});
