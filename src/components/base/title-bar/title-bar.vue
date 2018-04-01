<template>
  <div class="title-bar">
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/mixin.scss';
  .title-bar {
    height: 40px;
    line-height: 40px;
    text-align: center;
    span {
      display: inline-block;
      position: relative;
      font-weight: bold;
      color: #333;
      &:before {
         content: '';
         position: absolute;
         left: -45px;
         top: 20px;
         width: 30px;
         // 1px
         border-top: 1px solid #333;
         transform: scaleY(0.5);
       }
      &:after {
        content: '';
        position: absolute;
        right: -43px;
        top: 20px;
        width: 30px;
        // 1px
        border-top: 1px solid #333;
        transform: scaleY(0.5);
      }
    }
  }
</style>
