const Accounts = require('../../models/Accounts');

module.exports = async ctx => {
  try {
    const account = ctx.request.body;

    const newAccount = await Accounts.query().insert(account);

    ctx.status = 200;
    ctx.body = { data: newAccount };

  } catch (e) {
    const message = 'Internal server error';

    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };

  }
};
