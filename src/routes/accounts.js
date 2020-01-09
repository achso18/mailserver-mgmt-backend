const Router = require('koa-router');
const { List, Single, Create, Patch, Delete } = require('../controllers/accounts');

module.exports = new Router()
  .get('/accounts', List)
  .get('/account/:id', Single)
  .post('/account', Create)
  .patch('/account/:id', Patch)
  .delete('/account/:id', Delete);
