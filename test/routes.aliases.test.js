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

  describe('GET /alias/:id', () => {
    test('Should return a single alias', async () => {
      const alias = { id: 1, srcUsr: 'miller', srcDom: 'example.com', dstUsr: 'm_alias', dstDom: 'other.com', enabled: 1 };
      const res = await chai.request(server).get('/alias/1');
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(alias);
    });
  });

  describe('POST /alias', () => {
    test('Should return single alias after insert', async () => {
      const newAlias = { srcUsr: 'miller', srcDom: 'example.com', dstUsr: 'new_alias', dstDom: 'new_dom.com' };
      const res = await chai.request(server).post('/alias').send(newAlias);

      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(newAlias);
    });

    test('Should return error status message, when body invalid', async () => {
      const res = await chai.request(server).post('/alias').send({ srcUsr: 'miller', srcDom: 'example.com', dstUsr: '', dstDom: '' });

      expect(res.status).toEqual(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PATCH /alias/:id', () => {
    test('Should return ForeignKeyViolationError', async () => {
      const patched = { srcDom: 'patched.com' };
      const res = await chai.request(server).patch('/alias/1').send(patched);

      expect(res.status).toEqual(500);
      expect(res.body.error).toBeDefined();
    });

    test('Should rename alias dstUsr name', async () => {
      const newAlias = { srcUsr: 'miller', srcDom: 'example.com', dstUsr: 'new_alias', dstDom: 'new_dom.com' };
      const resNew = await chai.request(server).post('/alias').send(newAlias);

      const res =  await chai.request(server).patch(`/alias/${resNew.body.data.id}`).send({ dstUsr: 'patched_alias' });

      expect(res.status).toEqual(200);
      expect(res.body.data.dstUsr).toEqual('patched_alias');
    })
  });

  describe('DELETE /alias/:id', () => {
    test('Should return status 200', async () => {
      const newAlias = { srcUsr: 'miller', srcDom: 'example.com', dstUsr: 'new_alias', dstDom: 'new_dom.com' };
      const resNew = await chai.request(server).post('/alias').send(newAlias);

      const res =  await chai.request(server).delete(`/alias/${resNew.body.data.id}`);
      expect(res.status).toEqual(200);
    });

    test('Should delete existing alias', async () => {
      const res =  await chai.request(server).delete('/alias/1');

      expect(res.status).toEqual(200);
    });
  });

});
