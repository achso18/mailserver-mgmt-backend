const Accounts = require('../../models/Accounts');

module.exports = async ctx => {
  try {
    const accounts = await Accounts.query().select();

    ctx.status = 200;
    ctx.body = {
      data: accounts
    };
    
  } catch (e) {
    const message = 'Internal server error';
    ctx.status = e.statusCode || 500;
    ctx.body = {
      error: e.data || { message }
    };
  }
};
