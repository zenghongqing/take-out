<!-- 购物车控制 ( - num + ) 组件 -->
<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease" v-show="food.count" @click.stop="decrease($event)">
        <i class="icon icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="num" v-show="food.count">{{food.count}}</div>
    <div class="add" @click.stop.prevent="add($event)">
      <i class="icon icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  // 操作哪个商品
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    decrease (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    },
    add (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('drop', event.target)
    }
  }
}
</script>
<style lang="scss" scoped>
  .cart-control {
    font-size: 0;
    line-height: 24px;
    display: flex;
    flex-direction: row;
    .decrease, .add {
      padding: 6px;
      position: relative;
      flex: 1;
      i {
        font-size: 24px;
        color: #5ED14F;
        margin-right: 0;
        text-align: right;
        padding: 6px;
      }
    }
    .num {
      flex: 1;
      padding: 6px 0;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: rgb(147, 153, 159);
      vertical-align: top;
    }
  }
  .move-enter-active, .move-leave-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all .4s;
    i {
      transform: rotate(0);
      transition: all .4s;
    }
  }
  .move-enter, .move-leave-to {
    opcity: 0;
    transform: translate3d(24px, 0, 0);
    transition: all .4s;
    i {
      transform: rotate(360deg);
      transition: all .4s;
    }
  }
</style>
