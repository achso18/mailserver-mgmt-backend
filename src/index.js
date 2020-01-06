const Koa = require('koa');
const bodyParser = require('koa-body');
const domainsRouter = require('./routes/domains');
const accountsRouter = require('./routes/accounts');
const aliasesRouter = require('./routes/aliases');
const tlspoliciesRouter = require('./routes/tlspolicies');
const app = new Koa()
const PORT = process.env.PORT || 3000;


module.exports = app.use(bodyParser())
  .use(domainsRouter.routes())
  .use(accountsRouter.routes())
  .use(aliasesRouter.routes())
  .use(tlspoliciesRouter.routes())
  .listen(PORT, () => console.log(`Webserver listening on port: ${PORT}`));
