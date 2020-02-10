const Aliases = require('../../models/Aliases');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const [ alias ] = await Aliases.query().select().where({ id });

    ctx.status = 200;
    ctx.body = { data: alias };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message}
    };
  }
};
