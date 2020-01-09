const Router = require('koa-router');
const { List, Single, Create, Patch, Delete } = require('../controllers/aliases');

module.exports = new Router()
  .get('/aliases', List)
  .get('/alias/:id', Single)
  .post('/alias', Create)
  .patch('/alias/:id', Patch)
  .delete('/alias/:id', Delete);
