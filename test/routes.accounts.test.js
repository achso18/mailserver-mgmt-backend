process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const knex = require('../src/db/config');

describe('Routes: accounts', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /accounts', () => {
    test('Should return array of accounts', async () => {
      const accounts = [
        { id: 1, username: 'miller', domain: 'example.com', password: 'password', enabled: 1, quota: 0, sendonly: 0 },
        { id: 2, username: 'smith', domain: 'example.com', password: 'password', enabled: 1, quota: 0, sendonly: 0 },
        { id: 3, username: 'baker', domain: 'example.com', password: 'password', enabled: 1, quota: 0, sendonly: 0 }
      ];

      const res = await chai.request(server).get('/accounts');
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(accounts);
    });
  });

  describe('GET /account/:id', () => {
    test('Should return a single account', async () => {
      const account = { id: 1, username: 'miller', domain: 'example.com', password: 'password', enabled: 1, quota: 0, sendonly: 0 };

      const res = await chai.request(server).get('/account/1');
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(account);
    });
  });

  describe('POST /account', () => {
    test('Should return a single account after insert', async () => {
      const newAccount = { username: 'newUser', domain: 'example.com', password: 'newpass' };

      const res = await chai.request(server).post('/account').send(newAccount);
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.username).toEqual(newAccount.username);
    });

    test('Should return error status message when body invalid', async () => {
      const invalidAccount = { username: '',  domain: '', password: '' };

      const res = await chai.request(server).post('/account').send(invalidAccount);
      expect(res.status).toEqual(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PATCH /account/:id', () => {
    test('Should return ForeignKeyViolationError', async () => {
      const patched = { domain: 'patched.com' };
      const res = await chai.request(server).patch('/account/1').send(patched);
      expect(res.status).toEqual(500);
      expect(res.body.error).toBeDefined();
    });

    test('Should rename username', async () => {
      const patched = { username: 'muller'};
      const res = await chai.request(server).patch('/account/1').send(patched);
      expect(res.status).toEqual(200);
      expect(res.body.data.username).toEqual('muller');
    });
  });

  describe('DELETE /account/:id', () => {
    test('Should return status 200', async () => {
      const newAccount = { username: 'newUser', domain: 'example.com', password: 'newpass' };
      const resNew = await chai.request(server).post('/account').send(newAccount);

      const res =  await chai.request(server).delete(`/account/${resNew.body.data.id}`);
      expect(res.status).toEqual(200);
    });

    test('Should delete existing account', async () => {
      const res =  await chai.request(server).delete('/account/1');

      expect(res.status).toEqual(200);
    });
  });

});
