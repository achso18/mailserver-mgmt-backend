const Aliases = require('../../models/Aliases');

module.exports = async ctx => {
  try {
    const aliases = await Aliases.query().select();

    ctx.status = 200;
    ctx.body = {
      data: aliases
    };
  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };
  }
};
