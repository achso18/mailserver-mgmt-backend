const Aliases = require('../../models/Aliases');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    console.log(ctx.request.body);
    const affectedRows = await Aliases.query().patch(ctx.request.body).where({ id });
    if (!affectedRows) ctx.throw(409, { data: { message: 'Error updating alias' } });

    ctx.status = 200;
    ctx.body = {
      data: ctx.request.body
    };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };
  }
};
