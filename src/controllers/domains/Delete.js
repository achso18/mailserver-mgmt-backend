const Domains = require('../../models/Domains');

// Throws an error, but added for completeness!
module.exports = async ctx => {
  try {
    const { id } = ctx.params;

    const affectedRows = await Domains.query().delete().where({ id });

    if(!affectedRows) ctx.throw(409, { data: { message: 'Error deleting domain' } });

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
    //console.log(e);
  }
};
