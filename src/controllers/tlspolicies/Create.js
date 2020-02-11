const TlsPolicies = require('../../models/TlsPolicies');

module.exports = async ctx => {
  try {
    const tlspolicy = ctx.request.body;

    const newTlsPolicy = await TlsPolicies.query().insert(tlspolicy);

    ctx.status = 200;
    ctx.body = { data: newTlsPolicy };

  } catch (e) {
    const message = 'Internal server error';

    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };

  }
};
