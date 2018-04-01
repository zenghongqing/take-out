/***/
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/meituan')

let db = mongoose.connection

mongoose.Promise = global.Promise

db.on('error', () => {
  console.log('数据库连接失败!')
})

db.on('open', () => {
  console.log('数据库连接成功')
})
