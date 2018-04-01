/***/
import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

// 设置全局axios默认值
axios.defaults.timeout = 5000

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instance = axios.create()

instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

// request拦截器
instance.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = `token ${store.state.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// response拦截器

instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.dispatch('UserLogout')
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error.response)
})

export default {
  // 用户注册
  userRegister (data) {
    return instance.post('/api/reg', JSON.stringify(data))
  },
  // 用户登录
  userLogin (data) {
    return instance.post('/api/login', data)
  },
  // 获取初始化数据
  getIndexList () {
    return instance.get('/api/indexList')
  },
  // 获取商家列表
  getRestaurantList () {
    return instance.get('/api/getRestaurantList')
  },
  // 获取店家详细信息
  getSellerData (data) {
    return instance.get('/api/getSellerData?id=' + data)
  },
  // 获取点菜信息
  getGoodsData () {
    return instance.get('/api/goods')
  },
  // 获取评价信息
  getRatingsData () {
    return instance.get('/api/ratings')
  },
  // 获取底部导航栏发现的信息
  getFindGoodsThing () {
    return instance.get('/api/find')
  }
}
