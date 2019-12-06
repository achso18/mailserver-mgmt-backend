const Koa = require('koa');
const bodyParser = require('koa-body');
const app = new Koa()
const PORT = process.env.PORT || 3000;


module.exports = app.use(bodyParser())
  .listen(PORT, () => console.log(`Webserver listening on port: ${PORT}`));
