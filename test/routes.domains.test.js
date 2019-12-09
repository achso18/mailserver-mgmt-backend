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
      const newDom = { domain: 'newdomain.com' };
      const res = await chai.request(server).post('/domain').send(newDom);

      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.domain).toEqual(newDom.domain);
    });

    test('Should return error status message, when body invalid', async () => {
      const res = await chai.request(server).post('/domain').send({ domain: '' });

      expect(res.status).toEqual(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PATCH /domain/:id', () => {
    test('Should return ForeignKeyViolationError', async () => {
      const patched = { domain: 'patched.com' };
      const res = await chai.request(server).patch('/domain/1').send(patched);

      expect(res.status).toEqual(500);
      expect(res.body.error).toBeDefined();
    });

    test('Should rename domain name', async () => {
      const newDom = { domain: 'newdomain.com' };
      const resNew = await chai.request(server).post('/domain').send(newDom);

      const res =  await chai.request(server).patch(`/domain/${resNew.body.data.id}`).send({ domain: 'patched.com' });

      expect(res.status).toEqual(200);
      expect(res.body.data.domain).toEqual('patched.com');
    })
  });

  describe('DELETE /domain/:id', () => {
    test('Should return status 200', async () => {
      const newDom = { domain: 'newdomain.com' };
      const resNew = await chai.request(server).post('/domain').send(newDom);

      const res =  await chai.request(server).delete(`/domain/${resNew.body.data.id}`);
      expect(res.status).toEqual(200);
    });

    test('Should return ForeignKeyViolationError', async () => {
      const res =  await chai.request(server).delete('/domain/1');

      expect(res.status).toEqual(500);
    });
  });

});
