<template>
  <!--购物车-->
  <div class="shop-cart">
    <div class="content">
      <div class="main-content" @click="toggleList">
        <div class="left">
          <div class="logo-wrapper">
            <div :class="{'logo': true, 'log-light': totalCount > 0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="total-count">{{totalCount}}</div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}</div>
        </div>
        <div class="right" @click.stop="toPay">
          <div class="pay" :class="{'pay-light': minPrice <= totalPrice}">{{payDesc}}</div>
        </div>
      </div>
      <!--飞行小球-->
      <div class="ball-content">
        <div v-for="item in balls" :key="item.id">
          <transition name="drop"
                      @before-enter="beforeDrop"
                      @enter="dropping"
                      @after-enter="afterDrop">
            <div class="ball" v-if="item.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!--所选择的商品列表-->
      <transition name="fold">
        <!--不能用v-show-->
        <div class="shop-cart-list" v-show="isShowCart">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContentRef">
            <ul>
              <li v-for="food in selectFoods" :key="food.id" class="food">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="control">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!--模糊背景-->
      <transition name="fade">
        <div class="background" @click="hideList"  v-show="isShowCart"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import CartControl from '../cart-control/cart-control'
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      // 每个小球当前的状态
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      // 已经下落的小球
      dropBalls: [],
      // 是否显示购物车列表
      isShowCart: false
    }
  },
  props: {
    selectFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  watch: {
    selectFoods () {
      if (this.scroll) {
        this.scroll.refresh()
      }
    }
  },
  components: {
    CartControl
  },
  computed: {
    // 所选商品总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    // 所选商品总数量
    totalCount () {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.count
      })
      return total
    },
    // 20元起送 、 还差10元起送 、 去结算
    payDesc () {
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `${this.minPrice - this.totalPrice}起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    // 点击 + 派发的事件
    // 取得一个未下落的小球执行接下来的的下落动作
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          this.$set(this.balls[i], 'show', true)
          this.$set(this.balls[i], 'el', el)
          this.dropBalls.push(this.balls[i])
          // return
        }
      }
    },
    // 对 show = true 的小球设置动作
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        if (this.balls[count].show) {
          let rect = this.balls[count].el.getBoundingClientRect() // 获取小球的相对于视口的位移(小球高度)
          let x = (rect.left - 32)
          let y = -(window.innerHeight - rect.top - 22) // 负数,因为是从左上角往下的的方向
          el.style.display = '' // 清空display
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          // 处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 重绘，否则小球不会消失
      console.log(rf)
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    // 动作做完就把该小球 show = false
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    // 是否显示购物车列表
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.isShowCart = !this.isShowCart
      if (this.isShowCart) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContentRef, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        }, 20)
      }
    },
    // 清空购物车
    empty () {
      this.selectFoods.forEach(food => {
        food.count = 0
      })
      this.isShowCart = false
    },
    // 点击阴影背景隐藏
    hideList () {
      this.isShowCart = false
    },
    // 去结算
    toPay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      // mint-ui
      MessageBox.confirm(`您共需支付 ${this.totalPrice} 元`, '结算')
    }
  }
}
</script>
<style lang="scss" scoped>
  .shop-cart {
    .content {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 48px;
      z-index: 50;
      .main-content {
        display: flex;
        width: 100%;
        height: 48px;
        font-size: 0;
        background-color: #141d27;
        .left {
          flex: 1;
          .logo-wrapper {
            position: relative;
            width: 56px;
            height: 56px;
            display: inline-block;
            padding: 6px;
            margin: 0 12px;
            box-sizing: border-box;
            text-align: center;
            vertical-align: top;
            background: #141d27;
            border-radius: 50%;
            top: -10px;
            .logo {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #2b343c;
              i {
                font-size: 24px;
                line-height: 44px;
                color: #80858a;
              }
            }
            .log-light {
              background-color: #FFDA61;
              & i {
                color: #333;
              }
            }
            .total-count {
              position: absolute;
              right: 0;
              top: 0;
              width: 24px;
              height: 16px;
              line-height: 16px;
              border-radius: 12px 12px;
              background: #f01414;
              color: #fff;
              font-weight: 400;
              font-size: 9px;
              text-align: center;
            }
          }
          .price {
            display: inline-block;
            box-sizing: border-box;
            font-size: 16px;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 12px;
            padding-right: 12px;
            line-height: 24px;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }
          .desc {
            margin: 12px 0 0 12px;
            display: inline-block;
            font-size: 10px;
            color: rgba(255, 255, 255, .4);
            vertical-align: top;
            line-height: 24px;
          }
        }
        .right {
          flex: 0 0 105px;
          width: 105px;
          text-align: center;
          .pay {
            height: 48px;
            line-height: 48px;
            font-size: 12px;
            font-weight: 700;
            color: rgba(255, 255, 255, .4);
            background: #2b333b;
          }
          .pay-light {
            background-color: #FFDA61;
            color: #333;
          }
        }
      }
      // 飞行小球
      .ball-content {
        .ball {
          position: fixed;
          left: 32px;
          bottom: 22px;
          z-index: 200;
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        }
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #ffd16d;
          transition: all 0.4s linear;
        }
      }
      // 购物车列表
      .shop-cart-list {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 50;
        transform: translate3d(0, -100%, 0);
        -webkit-transform: translate3d(0, -100%, 0);
        .list-header {
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background-color: #f3f5f7;
          border-bottom: 1px solid rgba(7,17,27,.1);
          .title {
            float: left;
            font-size: 14px;
            color: #07111b;
          }
          .empty {
            float: right;
            font-size: 12px;
            color: #00a0dc;
          }
        }
        .list-content {
          max-height: 217px;
          padding: 0 18px;
          background-color: #fff;
          overflow: hidden;
          li {
            position: relative;
            padding: 12px 0;
            border-bottom: 1px solid rgba(7,17,27,.1);
            .name {
              line-height: 24px;
              font-size: 14px;
              color: #07111b;
            }
            .price {
              position: absolute;
              right: 98px;
              bottom: 12px;
              line-height: 24px;
              font-size: 14px;
              font-weight: 400;
              color: #f01414;
            }
            .control {
              position: absolute;
              right: 0;
              bottom: -5px;
            }
          }
        }
      }
      // 模糊背景
      .background {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        backdrop-filter: blur(10px);
        background-color: rgba(7, 17, 27, 0.6);
        &.fold-enter-active, &.fold-leave-active {
          transition: qll 0.4s;
        }
        &fold-enter, &.fold-leave {
          opacity: 0;
          background: rgba(7, 17, 27, 0);
        }
      }
    }
  }
</style>
