<template>
  <div>
    <div class="goods">
      <!--左侧菜单栏-->
      <div class="menu-wrapper" ref="menuRef">
        <ul>
          <li class="menu-item" v-for="(item, index) in goods" :key="item.id" :class="{'current': index === currentIndex}" @click="selectMenu(index, $event)">
            <span class="text">
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="food-wrapper" ref="foodsRef">
        <ul>
          <li class="foods-list foods-list-hook" v-for="item in goods" :key="item.id" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="food in item.foods" :key="food.id" @click="toFoodDetail(food, $event)">
                <div class="icon">
                  <img v-lazy="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <div class="desc">{{food.description}}</div>
                  <div class="extra">
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
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车-->
      <shop-cart ref="shopCartRef" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
      <!--商品详情页-->
      <goods-detail @drop="drop" :food="selectedFood" ref="goodsDetailRef"></goods-detail>
    </div>
  </div>
</template>
<script>
import api from '../../../../api/axios'
import CartControl from '../../../base/cart-control/cart-control'
import BScroll from 'better-scroll'
import shopCart from '../../../base/shopCart/shopCart'
import GoodsDetail from '../goods-detail/goods-detail'
export default {
  data () {
    return {
      // 商品数据
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      // 记录右侧每一大项的高度
      listHeight: [],
      // 记录当前滚动条的值
      scrollY: 0,
      menuScroll: '',
      foodsScroll: '',
      // 手动滑动距离
      scrollDis: '',
      // 需要传入详情页的商品
      selectedFood: {}
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    selectFoods () {
      let select = []
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.count) {
            select.push(food)
          }
        })
      })
      return select
    },
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if ((this.scrollY >= h1 && this.scrollY < h2) || !h2) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.getInitData()
  },
  mounted () {
  },
  components: {
    CartControl,
    shopCart,
    GoodsDetail
  },
  methods: {
    // 初始化数据
    getInitData () {
      api.getGoodsData().then((res) => {
        if (res.data && res.data.data) {
          this.goods = res.data.data
        }
        // 等待dom节点渲染完才能进行计算
        setTimeout(() => {
          // 初始化BScroll
          this._initScroll()
          // 计算右侧每一大项的高度
          this._calcHeight()
        }, 20)
      }).catch(err => {
        console.log(err)
      })
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuRef, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsRef, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.floor(pos.y))
        // console.log(this.scrollY, pos, '***')
      })
    },
    // 计算右侧每一大项的高度
    _calcHeight () {
      let foodList = this.$refs.foodsRef.getElementsByClassName('foods-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, len = foodList.length; i < len; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      // 防止pc端两次触发
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsRef.getElementsByClassName('foods-list-hook')
      let el = foodList[index]
      // this.foodsScroll.scrollToElement(el, 100)
      this.foodsScroll.scrollToElement(el, 100)
    },
    /**
     * params target {Object} 运动的目标对象
     * */
    drop (target) {
      // 性能优化，异步异步执行下落动画
      this.$nextTick(() => {
        // 这么做的目的是实现,
        // 在子组件cartcontrol点击之后,
        // 可以将该dom传给父组件goods然后再传给子组件shopcart,
        // (因为目前他们之间的通道就是这样,
        // shopcart子组件并没有导入cartcontrol子组件,
        // 所以没有直接通讯)这样就实现了多个组件之间的通讯,
        // 从而可以实现需求,例如这里就是实现点击子组件cartcontrol后添加一个动画,
        // 将小球滑落到另外一个组件shopcart
        this.$refs.shopCartRef.drop(target)
      })
    },
    // 点击进入商品详情页
    toFoodDetail (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.goodsDetailRef.show()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../assets/scss/mixin";
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    background: #fff;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      overflow: scroll;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        @include onepx('bottom');
        &.current {
          background: #fff;
          font-weight: bold;
        }
        .text {
          font-size: 12px;
          display: table-cell;
          vertical-align: middle;
          .icon {
            display: inline-block;
            height: 12px;
            width: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              @include bg-image('./img/decrease_3');
            }
            &.discount {
              @include bg-image('./img/discount_3');
            }
            &.guarantee {
              @include bg-image('./img/guarantee_3');
            }
            &.invoice {
              @include bg-image('./img/invoice_3');
            }
            &.special {
              @include bg-image('./img/special_3');
            }
          }
        }
      }
    }
    .food-wrapper {
      flex: 1;
      overflow: scroll;
      .foods-list {
        .title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          background: #f3f5f7;
        }
        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          position: relative;
          @include onepx('bottom');
          .icon {
            flex: 0 0 57px;
            width: 57px;
            height: 57px;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .content {
            flex: 1;
            flex-direction: column;
            .name {font-size: 14px;margin: 2px 0 8px;height: 14px;line-height: 14px;color: #07111b;}
            .desc {margin-bottom: 8px;line-height: 14px;font-size: 10px;color: #999;}
            .extra {
              margin-bottom: 8px;line-height: 12px;color: #93999f;font-size: 0;
              .count {font-size: 10px;margin-right: 12px;}
              .rating {font-size: 12px;}
            }
            .price {
              font-weight: 700;
              line-height: 24px;
              .new {
                color: red;
                font-size: 14px;
                margin-right: 8px;
              }
              .old {
                font-size: 10px;
                color: #93999f;
                text-decoration: line-through;
              }
            }
            .control {
              position: absolute;
              right: 0;
              bottom: 1px;
            }
          }
        }
      }
    }
  }
</style>
