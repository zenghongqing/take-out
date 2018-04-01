<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="item in itemClasses" :class="item" :key="item.id"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLSON = 'on'
const CLSHALF = 'half'
const CLSOFF = 'off'
export default {
  data () {
    return {}
  },
  computed: {
    // 星星类型包括三种：star-on, star-half和star-off
    starType () {
      return 'star-' + this.size
    },
    // 动态添加on, half和off
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      // 计算完整的星星个数
      let integal = Math.floor(score)
      // 是否有半星星（小数）
      let hasDecimal = score % 1 !== 0
      // 整星
      for (let i = 0; i < integal; i++) {
        result.push(CLSON)
      }
      // 半星
      if (hasDecimal) {
        result.push(CLSHALF)
      }
      // 补齐
      while (result.length < LENGTH) {
        result.push(CLSOFF)
      }
      return result
    }
  },
  props: {
    // 评分
    score: {
      type: Number,
      default: 0
    },
    // 星星尺寸
    size: {
      type: Number,
      default: 48
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  .star {
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        background-size: 10px 10px;
        margin-right: 3px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('img/star48_on')
        }
        &.half {
          @include bg-image('img/star48_half')
        }
        &.off {
          @include bg-image('img/star48_off')
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        background-size: 15px 15px;
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('img/star36_on')
        }
        &.half {
          @include bg-image('img/star36_half')
        }
        &.off {
          @include bg-image('img/star36_off')
        }
      }
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        margin-right: 22px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('img/star48_on')
        }
        &.half {
          @include bg-image('img/star48_half')
        }
        &.off {
          @include bg-image('img/star48_off')
        }
      }
    }
  }
</style>
