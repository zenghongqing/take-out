/***/
const jwt = require('jsonwebtoken')
// 登录时：核对用户名和密码成功后，应用将用户的（图中的user_id）作为JWT Payload的一个属性
module.exports = function (user_id) {
  const token = jwt.sign({
    user_id: user_id
    // 这是加密的key（密钥）
  }, 'sinner77', {
    // 过期时间设置为60s。那么decode这个token的时候得到的过期时间为：创建token的时间 + 设置的值
    expiresIn: '60s'
  })
  return token
}
