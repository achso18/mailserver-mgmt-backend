const TlsPolicies = require('../../models/TlsPolicies');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;

    const affectedRows = await TlsPolicies.query().delete().where({ id });

    if(!affectedRows) ctx.throw(409, { data: { message: 'Error deleting tlspolicy' } });

    ctx.status = 200;
    ctx.body = {
      message: 'success'
    };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };

  }
};
