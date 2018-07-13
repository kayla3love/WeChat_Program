var userModel = require('../lib/mysql.js');

async function get(ctx, next) {
  let ctx_query = ctx.query;
  let name = ctx_query.name;
  let schoolNumber = ctx_query.schoolNumber;
  let contact = ctx_query.contact;
  let totalCount = ctx_query.totalCount;
  await userModel.insertItem([name,schoolNumber,contact,totalCount]).then(() => {
    ctx.body = 'true'
  }).catch((err) => {
    ctx.body = err
  })
}

module.exports = {get}