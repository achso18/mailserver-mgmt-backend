const TlsPolicies = require('../../models/TlsPolicies');

module.exports = async ctx => {
  try {
    const tlspolicies = await TlsPolicies.query().select();

    ctx.status = 200;
    ctx.body = {
      data: tlspolicies
    };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };
  }
};
