const Domains = require('../../models/Domains');

// Throws an error, but added for completeness!
module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const { domain } = ctx.request.body;

    const affectedRows = await Domains.query().patch({ domain }).where({ id });

    if(!affectedRows) ctx.throw(409, { data: { message: 'Error updating domain' } });

    ctx.status = 200;
    ctx.body = {
      data: { domain }
    };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };
  }
};
