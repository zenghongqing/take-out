<template>
  <ul class="tab-bar">
    <router-link class="index" tag="li" to="/index">
      <i class="ico-index"></i>
      <span>首页</span>
    </router-link>
    <router-link class="find" tag="li" to="/find">
      <i class="ico-find"></i>
      <span>发现</span>
    </router-link>
    <router-link class="order" tag="li" to="/order">
      <i class="ico-order"></i>
      <span>订单</span>
    </router-link>
    <router-link class="mine" tag="li" to="/mine">
      <i class="ico-mine"></i>
      <span>我的</span>
    </router-link>
  </ul>
</template>
<script>
export default {
  components: {},
  data () {
    return {}
  },
  created () {},
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  mounted () {},
  destroyed () {}
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  .tab-bar {
    @include onepx();
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    text-align: center;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    background: #fcfcfc;
    li {
      flex: 1;
      color: #999;
      display: block;
      i {
        display: block;
        height: 25px;
        width: 25px;
        margin: 3px auto;
        background: url("./img/tab-icons.png") no-repeat;
        background-size: 25px auto;
      }
      span {
        display: block;
        font-size: 12px;
      }
    }
    li.router-link-active {
      color: #333;
    }
    .ico-index {
      background-position: 0 -75px;
    }
    li.router-link-active .ico-index {
      background-position: 0 -50px;
    }
    .ico-find {
      background-image: url("./img/find.png");
    }
    li.router-link-active .ico-find {
      background-image: url("./img/find1.png");
    }
    .ico-order {
      background-position: 0 -25px;
    }
    li.router-link-active .ico-order {
      background-position: 0px 0px;
    }
    .ico-mine {
      background-position: 0 -125px;
    }
    li.router-link-active .ico-mine {
      background-position: 0 -100px;
    }
  }
</style>
