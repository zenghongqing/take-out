const router = require('koa-router')()
const user = require('../controller/user')
module.exports = (app) => {
  router.post('/api/reg', user.doRegister)
  router.post('/api/login', user.doLogin)
  router.get('/api/indexList', user.getIndexList)
  router.get('/api/getRestaurantList', user.getRestaurantList)
  router.get('/api/getSellerData', user.getSellerData)
  router.get('/api/goods', user.getGoodsData)
  router.get('/api/ratings', user.getRatingsData)
  router.get('/api/find', user.getFindThingData)
  app.use(router.routes()).use(router.allowedMethods())
}
