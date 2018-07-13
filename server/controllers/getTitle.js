var userModel = require('../lib/mysql.js');
var index = new Array(40);
var questions = new Array(40);
var Result

async function get(ctx, next) {
    await userModel.getTitle0()
      .then(result => {
        Result = result
      }).catch((err) => {
        ctx.body = err
      })
    for (var i = 0; i < 10; i++) {  //修改题目数目
      index[i] = Result[i].id
      questions[i] = Result[i]
    }

   /* await userModel.getTitle1()
      .then(result => {
        Result = result
      }).catch((err) => {
        ctx.body = err
      })
    for (var i = 0; i < 1; i++) {
      index[i + 20] = Result[i].id
      questions[i + 20] = Result[i]
    }*/

  var data = {
    index: index,
    questions: questions,
  }
  ctx.body = data
}

module.exports = { get }