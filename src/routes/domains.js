const Router = require('koa-router');
const { List, Single } = require('../controllers/domains');

module.exports = new Router()
  .get('/domains', List)
  .get('/domain/:id', Single);
