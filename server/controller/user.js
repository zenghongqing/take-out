/**

 */
const User = require('../dbHelper/user').User

// 下面两个包用来生成时间
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../token/createToken')

// 用于密码加密
const sha1 = require('sha1')
// 根据用户名查找用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({username}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 注册操作
const doRegister = async (ctx, next) => {
  if (ctx.request.body.register_password1 !== ctx.request.body.register_password2) {
    ctx.status = 200
    ctx.success = false
  }
  let user = new User({
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password: sha1(ctx.request.body.register_password1),
    token: createToken(this.username)
  })
  console.log(user)
  ctx.status = 200
  // 将objectid转换为用户创建时间（可以用不用）
  user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss')
  let doc = await findUser(user.user)
  if (doc) {
    console.log('用户名已经存在')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    console.log('注册成功')
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }
}
// 登录操作
const doLogin = async (ctx, next) => {
  let username = ctx.request.body.username
  let password = sha1(ctx.request.body.password)
  let doc = await findUser(username)
  console.log(doc)
  if (!doc) {
    console.log('检查到用户不存在')
    ctx.status = 200
    ctx.body = {
      info: false
    }
  } else if (doc.password === password) {
    console.log('密码一致')
    let token = createToken(username)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token,
      create_time: doc.create_time
    }
  } else {
    console.log('密码错误!')
    ctx.status = 200
    ctx.body = {
      success: false
    }
  }
}
// 获取初始化列表数据
let indexList = require('../../mock/index-list')
const getIndexList = async (ctx, next) => {
  ctx.body = {
    indexList
  }
  ctx.success = true
}
// 获取商家列表
let restaurantList = require('../../mock/restaurant-list')
const getRestaurantList = async (ctx, next) => {
  ctx.body = {
    restaurantList
  }
  ctx.status = 200
  ctx.success = true
}
// 获取店家详细信息
let seller = require('../../mock/seller')
const getSellerData = async (ctx, next) => {
  ctx.body = {
    data: seller.seller
  }
  ctx.status = 200
  ctx.success = true
}
// 获取点菜信息
const getGoodsData = async (ctx, next) => {
  ctx.body = {
    data: seller.goods
  }
  ctx.status = 200
  ctx.success = true
}
// 获取评价信息
const getRatingsData = async (ctx, next) => {
  ctx.body = {
    data: seller.ratings
  }
}
// 发现周围美食与美景
const findGoodsThing = require('../../mock/find-list')
const getFindThingData = async (ctx, next) => {
  ctx.body = {
    data: findGoodsThing.data
  }
}
module.exports = {
  doRegister,
  doLogin,
  getIndexList,
  getRestaurantList,
  getSellerData,
  getGoodsData,
  getRatingsData,
  getFindThingData
}
