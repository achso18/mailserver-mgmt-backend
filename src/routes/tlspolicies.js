const Router = require('koa-router');
const { List, Single, Create, Patch, Delete } = require('../controllers/tlspolicies');

module.exports = new Router()
  .get('/tlspolicies', List)
  .get('/tlspolicy/:id', Single)
  .post('/tlspolicy', Create)
  .patch('/tlspolicy/:id', Patch)
  .delete('/tlspolicy/:id', Delete);
