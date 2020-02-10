const Aliases = require('../../models/Aliases');

module.exports = async ctx => {
  try {
    const alias = ctx.request.body;

    const newAlias = await Aliases.query().insert(alias);

    ctx.status = 200;
    ctx.body = { data: newAlias };

  } catch (e) {
    const message = 'Internal server error';

    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };

  }
};
