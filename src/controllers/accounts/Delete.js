const Accounts = require('../../models/Accounts');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;

    const affectedRows = await Accounts.query().delete().where({ id });

    if(!affectedRows) ctx.throw(409, { data: { message: 'Error deleting account' } });

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
