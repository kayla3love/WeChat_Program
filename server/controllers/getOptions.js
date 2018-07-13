var userModel = require('../lib/mysql.js');
var index = new Array(40);
var Result

async function get(ctx, next) {
  var indexString = ctx.query.index;
  var indexString1 = indexString.substring(1, indexString.length - 1);
  index = indexString1.split(",");
  let sql = "";
  var newIndex = new Array();
  for(var i = 0; i < 40; i++){
    if(index[i] !== "null"){
     newIndex.push(index[i])
    }
  }
  let length = newIndex.length;
  for(var j = 0; j < length; j++){
    if(j !== length - 1){
      sql += "id= " + newIndex[j] + " || "
    }
    else{
      sql += "id= " + newIndex[j]
    }
  }
  await userModel.getOptions(sql).then(result => {
    Result = result
    }).catch((err) => {
      ctx.body = err
    })

  var options = new Array();

  for (var k = 0; k < Result.length; k += 4) {
    var items = new Array(4);
    for (var p = 0; p < 4; p++) {
      items[p] = Result[k + p]
    }
    options.push(items)
  }
  ctx.body = options;
}
module.exports = { get }