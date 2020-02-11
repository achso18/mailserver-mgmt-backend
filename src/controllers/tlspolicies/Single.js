const TlsPolicies = require('../../models/TlsPolicies');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const [ tlspolicy ] = await TlsPolicies.query().select().where({ id });

    ctx.status = 200;
    ctx.body = { data: tlspolicy };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message}
    };
  }
};
