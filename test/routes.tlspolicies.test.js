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

  describe('GET /tlspolicy/:id', () => {
    test('Should return a single tlspolicy', async () => {
      const tlspolicy = { id: 1, domain: 'google.com', policy: 'encrypt', params: null };
      const res = await chai.request(server).get('/tlspolicy/1');
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(tlspolicy);
    });
  });

  describe('POST /tlspolicy', () => {
    test('Should return single tlspolicy after insert', async () => {
      const newPolicy = { domain: 'domain.com', policy: 'none' };
      const res = await chai.request(server).post('/tlspolicy').send(newPolicy);

      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toMatchObject(newPolicy);
    });

    test('Should return error status message, when body invalid', async () => {
      const res = await chai.request(server).post('/tlspolicy').send({ domain: 'other.com', policy: 'wrong' });

      expect(res.status).toEqual(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PATCH /tlspolicy/:id', () => {
    test('Should rename tlspolicy policy field', async () => {
      const newPolicy = { domain: 'domain.com', policy: 'none' };
      const resNew = await chai.request(server).post('/tlspolicy').send(newPolicy);

      const res =  await chai.request(server).patch(`/tlspolicy/${resNew.body.data.id}`).send({ policy: 'encrypt' });

      expect(res.status).toEqual(200);
      expect(res.body.data.policy).toEqual('encrypt');
    })
  });

  describe('DELETE /tlspolicy/:id', () => {
    test('Should return status 200', async () => {
      const newPolicy = { domain: 'domain.com', policy: 'none' };
      const resNew = await chai.request(server).post('/tlspolicy').send(newPolicy);

      const res =  await chai.request(server).delete(`/tlspolicy/${resNew.body.data.id}`);
      expect(res.status).toEqual(200);
    });

    test('Should delete existing tlspolicy', async () => {
      const res =  await chai.request(server).delete('/tlspolicy/1');

      expect(res.status).toEqual(200);
    });
  });

});
