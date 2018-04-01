<template>
  <transition name="shift">
    <div class="goods-detail" ref="goodsDetailRef" v-if="isPageShow">
      <div>
        <div class="image-header">
          <img :src="food.image"/>
        </div>
        <div class="title-content">
          <div class="name">{{food.name}}</div>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="control">
            <cart-control :food="food" @drop="drop"></cart-control>
          </div>
          <transition name="fade">
            <!--修饰符可以串联-->
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <cross-line></cross-line>
        <div class="info">
          <h2>商品介绍</h2>
          <div class="con">
            {{food.info}}
          </div>
        </div>
        <cross-line></cross-line>
        <div class="ratings">
          <div class="title">商品评价</div>
          <rating-select :ratings="food.ratings"
                         :onlyContent="onlyContent"
                         @select="select"
                         :selectType="selectType"
                         @switchContent="switchContent"
                         :desc="desc"></rating-select>
        </div>
        <div class="ratings-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li class="ratings-item" v-for="item in food.ratings" :key="item.id" v-show="needShow(item.rateType, item.text)">
              <div class="user">
                <span class="name">{{item.username}}</span>
                <img :src="item.avatar"/>
              </div>
              <div class="time">
                {{item.rateTime | moment}}
              </div>
              <div class="text">
                <i :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': 1}"></i>
                {{item.text}}
              </div>
            </li>
          </ul>
        </div>
        <div class="no-ratings" v-show="food.ratings && food.ratings.length === 0">
          暂无评价
        </div>
        <!--返回按钮-->
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import CartControl from '../../../base/cart-control/cart-control'
import CrossLine from '../../../base/cross-line/cross-line'
import RatingSelect from '../../../base/rating-select/ratings-select'
import Vue from 'vue'
import moment from 'moment'
import BScroll from 'better-scroll'
const ALL = 2
export default {
  data () {
    return {
      // 是否显示详情页
      isPageShow: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      selectType: ALL,
      // 只显示有内容的评价
      onlyContent: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    CartControl,
    CrossLine,
    RatingSelect
  },
  filters: {
    moment (time) {
      return moment(time).format('YYYY-MM-DD, hh-mm')
    }
  },
  created () {
    console.log(this.food, '详情')
  },
  methods: {
    show () {
      this.isPageShow = true
      // 初始化 better-scroll
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.goodsDetailRef, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    drop (target) {
      this.$emit('drop', target)
    },
    // 加入购物车
    addFirst (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
      // 将当前dom节点传递出去，用来做小球飞入效果
      this.$emit('drop', event.target)
    },
    // 选择评价的类型
    select (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 切换到只有内容的评价
    switchContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 需要显示的评价内容
    needShow (type, content) {
      if (this.onlyContent && !content) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    hide () {
      this.isPageShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .goods-detail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    z-index: 49;
    &.shift-enter-active, &-shift-leave-active {
      transition: all 0.2s linear;
    }
    &.shift-enter, &.shift-leave {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    // 商品图片
    .image-header {
      // 制作一个宽高相等的容器
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .title-content {
      position: relative;
      padding: 18px;
      .name {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
      }
      .detail {
        line-height: 25px;
        margin-bottom: 18px;
        height: 10px;
        font-size: 0;
        .count, .rating {
          font-size: 10px;
          color: #93999f;
          display: inline-block;
          &.rating {
            margin-left: 12px;
          }
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .new {
          color: #f01414;
          font-size: 14px;
          margin-right: 8px;
        }
      }
      .control {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 28px;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        font-size: 10px;
        background-color: #ffd161;
        /*z-index: 49;*/
        border-radius: 12px;
        z-index: 50;
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.4s linear;
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }
      }
    }
    .info {
      padding: 18px;
      h2 {
        line-height: 14px;
        font-size: 14px;
        margin-bottom: 6px;
        color: #07111b;
      }
      .con {
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
        margin: 0 6px;
      }
    }
    .ratings {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: #07111b;
      }
    }
    .ratings-wrapper {
      padding: 0 18px;
      .ratings-item {
        position: relative;
        padding: 16px 0;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .user {
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;
          .name {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            color: #93999f;
            margin-right: 6px;
          }
          img {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
        }
        .time {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: #93999f;
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: #93999f;
          .icon-thumb_up {
            line-height: 24px;
            margin-right: 4px;
            font-size: 12px;
            color: #00a0dc;
          }
        }
      }
    }
  }
  .no-ratings {
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
  .back {
    position: fixed;
    left: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    background: rgba(7, 17, 27, 0.5);
    border-radius: 50%;
    i {
      display: block;
      padding: 10px;
      font-size: 20px;
      color: #fff;
    }
  }
</style>
