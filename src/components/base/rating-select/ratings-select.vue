<!-- 选择评价类型（全部、推荐、吐槽） 组件 -->
<template>
  <div class="ratings-select">
    <div class="type">
      <span class="block all" :class="{'active': selectType === 2}" @click="select(2, $event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active': selectType === 0}" @click="select(0, $event)">
        {{desc.positive}}
        <span class="count">{{positiveRatings.length}}</span>
      </span>
      <span class="block negative" :class="{'active': selectType === 1}" @click="select(1, $event)">
        {{desc.negative}}
        <span class="count">{{negativeRatings.length}}</span>
      </span>
    </div>
    <div class="choice" @click="switchContent" :class="{'on': onlyContent === true}">
      <i class="icon-check_circle"></i>
      <span class="text">只能看有内容的评价</span>
    </div>
  </div>
</template>
<script>
// 正面评价、负面评价、所有
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  data () {
    return {}
  },
  props: {
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    ratings: {
      type: Array
    },
    selectType: {
      type: Number,
      default: ALL
    },
    // 只显示有内容的评价(默认关闭，显示全部)
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    positiveRatings () {
      return this.ratings.filter(item => {
        return item.rateType === POSITIVE
      })
    },
    negativeRatings () {
      return this.ratings.filter(item => {
        return item.rateType === NEGATIVE
      })
    }
  },
  methods: {
    // 切换评价
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    },
    // 切换只有文字的评价内容
    switchContent (event) {
      if (!event._constructed) {
        return
      }
      // this.onlyContent = !this.onlyContent
      this.$emit('switchContent', this.onlyContent)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  .ratings-select {
    .type {
      padding: 18px 0;
      margin: 0 18px;
      @include onepx('bottom')
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 16px;
        color: #4d555d;
        &.all {
          background: rgba(0,160,220,.2);
        }
        &.positive {
          background: rgba(0,160,220,.2);
        }
        &.negative {
          background: rgba(77,85,93,.2);
          &.active {
            background-color: rgba(77, 85, 93, 1.0);
          }
        }
        &.active {
          background: #00B7FF;
          color: #fff;
        }
      }
    }
    .choice {
      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        color: #fff;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
      }
      &.on i {
        background-color: #00c850;
        color: #fff;
      }
      padding: 12px 18px;
      line-height: 24px;
      color: #93999f;
      border-bottom: 1px solid rgba(7,17,27,.1);
      .text {
        font-size: 14px;
      }
    }
  }
</style>
