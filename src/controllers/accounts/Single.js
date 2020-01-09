const Accounts = require('../../models/Accounts');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const [account] = await Accounts.query().select().where({ id });

    ctx.status = 200;
    ctx.body = { data: account };

  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message}
    };
  }
};
