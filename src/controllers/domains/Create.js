const Domains = require('../../models/Domains');

module.exports = async ctx => {
  try {
    const { domain } = ctx.request.body;

    const newDom = await Domains.query().insert({ domain });

    ctx.status = 200;
    ctx.body = { data: newDom };

  } catch (e) {
    const message = 'Internal server error';

    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };
  }
};
