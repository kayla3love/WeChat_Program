var userModel = require('../lib/mysql.js');

async function get(ctx, next) {
  let ctx_query = ctx.query.studentNumber;
  let schoolNumber = ctx_query;
  await userModel.checkExist(schoolNumber).then(result => {
     if(result.length === 0){
       ctx.body = "true"
     }
     else{
       ctx.body = "false"
     }
  }).catch((err) => {
     ctx.body = err;
  })
}

module.exports = { get }