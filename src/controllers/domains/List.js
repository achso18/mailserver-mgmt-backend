const Domains = require('../../models/Domains');

module.exports = async ctx => {
  try {
    const domains = await Domains.query().select();

    ctx.status = 200;
    ctx.body = {
      data: domains
    };
  }
  catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statuscode || 500;
    ctx.body = {
      error: e.data || { message}
    };
  }
};
