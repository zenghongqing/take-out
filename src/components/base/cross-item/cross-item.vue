<!-- 我的收藏/我的足迹... 组件 -->
<template>
  <div class="cross-item">
    <!--实心图标-->
    <span class="ico"><slot></slot></span>
    <span class="name">{{name}}</span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    name: {
      type: String,
      default: '我的'
    }
  }
}
</script>
<style lang="scss" scoped>
  .cross-item {
    background: #fff;
    color: #333;
    padding: 0 15px;
    margin: 0 15px;
    height: 44px;
    line-height: 46px;
    border-bottom: 1px solid #e4e4e4;
    .ico {
      display: inline-block;
      width: 30px;
      i {
        color: #fe970f;
        font-size: 20px;
      }
    }
    .name {font-size: 15px;}
  }
</style>
