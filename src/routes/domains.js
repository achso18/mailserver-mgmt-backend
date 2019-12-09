const Router = require('koa-router');
const { List } = require('../controllers/domains');

module.exports = new Router()
  .get('/domains', List);
