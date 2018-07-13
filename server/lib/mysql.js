var mysql = require('mysql');
var config = require('../config.js')

var pool = mysql.createPool({
  user: config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.db,
  host: config.mysql.host,
});

let query = function (sql, values) {

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })

}
//插入个人信息
let insertItem = function (value) {
  let _sql = "insert into personalInfo(name,studentNumber,contact,totalCount) values(?,?,?,?);"
  return query(_sql, value)
}
//检测个人信息是否存在
let checkExist = function(studentNumber){
  let _sql = "SELECT * FROM personalInfo WHERE studentNumber='" + studentNumber + "'"
  return query(_sql)
}
//获得题目对应的选项
let getOptions = function(sql){
  let _sql = "SELECT * FROM options WHERE " + sql +" ORDER BY id, optionItem"
  return query(_sql)
}
//随机获得类型为0的题目5道
let getTitle0 = function () {
  let _sql = "SELECT * FROM questions ORDER BY RAND() LIMIT 10"  //修改题目数目
  return query(_sql)
}
//随机获得类型为1的题目1道
let getTitle1 = function () {
  let _sql = "SELECT * FROM questions WHERE type = 1 ORDER BY RAND() LIMIT 10"
  return query(_sql)
}
module.exports = {
  query,
  insertItem,
  getOptions,
  getTitle0,
  getTitle1,
  checkExist
}