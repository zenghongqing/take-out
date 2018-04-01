<template>
  <div class="restaurant-detail">
    <seller-header :seller="seller"></seller-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="./goods">点菜</router-link>
      </div>
      <div class="tab-item">
        <router-link to="./ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="./seller">商家</router-link>
      </div>
    </div>
    <!--能在组件切换过程中将状态保留在内存中，防止重复渲染DOM-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import SellerHeader from '../../base/seller-header/seller-header'
import util from '../../../assets/js/utils'
import api from '../../../api/axios'
export default {
  data () {
    return {
      seller: {
        id: util.http.urlParse().id || '0001'
      },
      selected: '1'
    }
  },
  computed: {},
  props: {},
  created () {
    this._initShopData()
  },
  components: {
    SellerHeader
  },
  methods: {
    // 初始化商家数据
    _initShopData () {
      api.getSellerData(this.seller.id).then((res) => {
        if (res.data && res.data.data) {
          this.seller = Object.assign({}, this.seller, res.data.data)
          console.log(this.seller, '获取')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/mixin";
  .restaurant-detail {
    .tab {
      display: flex;
      flex-direction: row;
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      position: relative;
      @include onepx('bottom');
      .tab-item {
        flex: 1;
        align-content: space-around;
        background: #fff;
        a {
          display: inline-block;
          font-size: 14px;
          color: #4d555d;
          &.router-link-active {
            color: red;
          }
        }
      }
    }
  }
</style>
