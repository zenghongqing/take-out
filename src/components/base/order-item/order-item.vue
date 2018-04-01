<template>
  <div class="order-item">
    <div class="top">
      <img v-lazy="data.pic_url"/>
      <div class="name">{{data.name}}</div>
      <div class="status">订单已完成</div>
    </div>
    <div class="mid">
      <div class="food">香辣爆炒牛肚煲仔饭<span>x1</span></div>
      <div class="cost">总计1个菜，实付<span>￥12.00</span></div>
    </div>
    <div class="bottom">
      <div class="again">再来一单</div>
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
  @import "~@/assets/scss/mixin.scss";
  .order-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 180px;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    background: #fff;
    color: #333;
    .top {
      flex: 1;
      padding: 0 15px;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      @include onepx('bottom');
      img {
        float: left;
        width: 40px;
        height: 40px;
        margin: 5px 10px 0 0;
        border-radius: 50%;
      }
      .name {
        position: relative;
        float: left;
        max-width: 50%;
        font-weight: 700;
        font-size: 16px;
        color: #333;
        @include ellipsis()
      }
      .status {
        float: right;
        color: #999;
      }
    }
    .mid {
      flex: 2;
      margin: 0 5px 0 65px;
      padding-top: 10px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      position: relative;
      @include onepx('top');
      .food {
        line-height: 25px;
        font-size: 12px;
        span {
          float: right;
          color: #151515;
          font-size: 14px;
        }
      }
      .cost {
        float: right;
        line-height: 25px;
        font-size: 12px;
      }
    }
    .bottom {
      flex: 1;
      position: relative;
      padding: 0 15px;
      font-size: 14px;
      line-height: 24px;
      height: 24px;
      @include onepx('top');
      .again {
        float: right;
        width: 76px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 2px;
        margin: 9px 0;
      }
    }
  }
</style>
