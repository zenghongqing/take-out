<template>
  <div>
    <div class="find-item">
      <div class="top">
        <img v-lazy="data.img"/>
      </div>
      <div class="bottom">
        <div class="title">{{data.title}}</div>
        <div class="writer">周边生活</div>
        <div class="view">{{data.view}}人看过</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  .find-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    background: #fff;
    color: #333;
    .top {
      width: 100%;
      height: 160px;
      overflow: hidden;
      img {
        width: 100%;
        height: 160px;
      }
    }
    .bottom {
      height: 100px;
      width: 100%;
      position: relative;
      margin-top: 10px;
      .title {
        font-size: 18px;
        font-weight: bold;
        @include ellipsis(2)
      }
      .writer {
        font-size: 14px;
        margin-top: 10px;
        color: #999;
      }
      .view {
        position: absolute;
        bottom: 0;
        /*left: 0;*/
        color: #999;
        font-size: 14px;
      }
    }
  }
</style>
