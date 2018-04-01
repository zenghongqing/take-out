<template>
  <div class="location-search">
    <div class="nav-wrap-left">
      <span class="city">{{city || '深圳'}}</span>
      <span class="local"></span>
    </div>
    <div class="box-search">
      <i class="icon"></i>
      <span class="single-line">输入商家/品类/商圈</span>
    </div>
    <div class="nav-wrap-right">
      <router-link class="mine" to="/mine">
        <i class="ico-mine"></i>
        <span class="text">我的</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      city: ''
    }
  },
  created () {
    this.getLocation()
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          var lat = pos.coords.latitude
          var lng = pos.coords.longitude
          console.log(lat, lng)
        }, err => {
          console.log(err)
        }, { enableHighAccuracy: true })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  .location-search {
    display: flex;
    height: 50px;
    background: #06c1ae;
    color: #fff;
    border-bottom: 1px solid #21897d;
    position: relative;
    .nav-wrap-left {
      width: 100px;
      line-height: 50px;
      .city {
        display: inline-block;
        margin-left: 8px;
        width: 40px;
        font-size: 14px;
        vertical-align: top;
        text-align: center;
        @include ellipsis(1);
      }
      .local {
        display: inline-block;
        height: 25px;
        width: 25px;
        background: url("./img/location.png") no-repeat;
        background-size: 25px 25px;
        vertical-align: middle;
      }
    }
    .box-search {
      height: 32px;
      margin-top: 10px;
      line-height: 32px;
      background: rgba(0,0,0,.15);
      border-radius: 3px;
      flex: 1;
      .single-line {
        font-size: 13px;
        color: #68dbce;
        padding-left: 13px;
        box-sizing: border-box;
        width: 100%;
        display: block;
        @include ellipsis(1);
      }
    }
    .nav-wrap-right {
      display: inline-block;
      width: 50px;
      height: 50px;
      text-align: center;
      position: relative;
      .mine {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
        i{
          height: 25px;
          width: 25px;
          display: block;
          margin: 3px auto 3px;
          text-align: center;
          background: url("./img/tab-icons.png") no-repeat;
          background-size: 25px auto;
          background-position: 0 -125px;
        }
        .text {
          color: #fff;
          font-size: 12px;
          display: block;
        }
      }
    }
  }
</style>
