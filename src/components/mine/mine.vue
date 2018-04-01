<template>
  <div class="mine">
    <div class="top">
      <div class="info">
        <div class="avatar-wrapper">
          <img src="../../assets/img/lazyload.jpeg"/>
        </div>
        <div class="name-wrapper" @click="login" v-if="!isLogin">
          <span class="name">登陆</span>
          <span class="desc">个人信息<i class="iconfont icon-more"></i></span>
        </div>
        <div class="name-wrapper" v-else>
          <span class="name">{{username}}</span>
          <span class="desc">个人信息<i class="iconfont icon-more"></i></span>
        </div>
      </div>
      <div class="operation">
        <i class="iconfont icon-huanfu"></i>
        <i class="iconfont icon-youjian"></i>
        <i class="iconfont icon-shezhi"></i>
      </div>
    </div>
    <cross-line></cross-line>
    <div class="important">
      <cross-item name="我的收藏">
        <i class="iconfont icon-shoucang1"></i>
      </cross-item>
      <cross-item name="我的足迹">
        <i class="iconfont icon-zuji"></i>
      </cross-item>
      <cross-item name="收货地址">
        <i class="iconfont icon-dizhi"></i>
      </cross-item>
      <cross-item name="余额">
        <i class="iconfont icon-money"></i>
      </cross-item>
    </div>
    <cross-line></cross-line>
    <div class="about">
      <cross-item name="关于">
        <i class="iconfont icon-daohangguanyu"></i>
      </cross-item>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from '../base/tab-bar/tab-bar'
import CrossItem from '../base/cross-item/cross-item'
import CrossLine from '../base/cross-line/cross-line'
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      username: '',
      // 判断是否登录
      isLogin: false
    }
  },
  computed: {
  },
  created () {
    let name = sessionStorage.getItem('username') || ''
    if (name) {
      this.username = name
      this.isLogin = true
      sessionStorage.setItem('logInStatus', true)
    }
  },
  components: {
    TabBar,
    CrossItem,
    CrossLine
  },
  methods: {
    login () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .mine {
    width: 100%;
    height: 100%;
    .top {
      display: flex;
      position: relative;
      background-color: #06c1ae;
      height: 120px;
      width: 100%;
      .info {
        flex: 2;
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        .avatar-wrapper {
          margin-left: 20px;
          width: 70px;
          height: 70px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .name-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-top: 10px;
          margin-left: 20px;
          height: 55px;
          .name {
            font-size: 16px;
            color: #fff;
            font-weight: bold;
          }
          .desc {
            font-size: 16px;
            color: #fcfefe;
            i {
              font-size: 18px;
            }
          }
        }
      }
      .operation {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-end;
        i {
          margin-top: 10px;
          margin-right: 15px;
          font-size: 18px;
          color: #fff;
          font-weight: 500;
        }
      }
    }
    .important {
      width: 100%;
      background-color: #fff;
    }
    .about {
      width: 100%;
      background-color: #fff;
      .cross-item {
        &:last-child {
          border: none;
        }
      }
    }
  }
</style>
