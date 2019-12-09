const Router = require('koa-router');
const { List, Single, Create, Patch, Delete } = require('../controllers/domains');

module.exports = new Router()
  .get('/domains', List)
  .get('/domain/:id', Single)
  .post('/domain', Create)
  .patch('/domain/:id', Patch)
  .delete('/domain/:id', Delete);
