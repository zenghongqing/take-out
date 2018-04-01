<template>
  <div class="seller" ref="sellerRef">
    <div>
      <div class="review">
        <div class="collect">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="rating-count">({{seller.ratingCount}})</span>
          </div>
          <div class="sell-count">月售{{seller.sellCount}}单</div>
          <div class="collect-icon" @click="toggleFavorites">
            <i class="icon-favorite" :class="{'active': favorite}"></i>
            <div class="text">{{favorite?'已收藏':'未收藏'}}</div>
          </div>
        </div>
        <div class="param">
          <div class="left">
            <span class="text">起送价</span>
            <span class="price">
              <span class="num">20</span>元
            </span>
          </div>
          <div class="middle">
            <span class="text">商家配送</span>
            <span class="price">
              <span class="num">4</span>元
            </span>
          </div>
          <div class="right">
            <span class="text">平均配送时间</span>
            <span class="price">
              <span class="num">440</span>元
            </span>
          </div>
        </div>
      </div>
      <cross-line></cross-line>
      <div class="notice">
        <h1 class="title">公告与活动</h1>
        <div class="text">{{seller.bulletin}}</div>
        <ul v-if="seller.supports">
          <li class="support" v-for="item in seller.supports" :key="item.id">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="description">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <cross-line></cross-line>
      <div class="photo">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picRef">
          <ul class="pic-list" ref="picListRef">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
              <img :src="pic"/>
            </li>
          </ul>
        </div>
      </div>
      <cross-line></cross-line>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="item" v-for="info in seller.infos" :key="info.id">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Star from '../../../base/star/star'
import CrossLine from '../../../base/cross-line/cross-line'
export default {
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      // 收藏图标样式
      favorite: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  watch: {
    seller () {
      // this.$nextTick(() => {
      //   this._initScroll()
      // })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._initPicScroll()
    })
  },
  components: {
    Star,
    CrossLine
  },
  methods: {
    // 初始化页面滚动
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerRef, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    // 初始化图片水平滚动
    // 手动设置横向宽度
    _initPicScroll () {
      if (this.seller.pics) {
        const picWidth = 120
        const margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picListRef.style.width = width + 'px'
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.picRef, {
            click: true,
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picScroll.refresh()
        }
      }
    },
    // 收藏
    toggleFavorites (event) {
      // 解决移动端响应两次点击事件的问题
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      // console.log(store.setLocalstorage(this.seller.id, 'favorites', this.favorite))
    }
  }
}
</script>
<style lang="scss" scoped>
  .seller {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    .review {
      position: relative;
      padding: 18px;
      .collect {
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .name {
          font-size: 16px;
          color: #07111b;
          line-height: 14px;
          margin-bottom: 14px;
        }
        .star-wrapper {
          display: inline-block;
          margin-right: 12px;
          .star {
            display: inline-block;
          }
          .rating-count {
            display: inline-block;
            font-size: 14px;
            color: #07111b;
            line-height: 14px;
          }
        }
        .sell-count {
          display: inline-block;
          font-size: 14px;
          color: #07111b;
          line-height: 14px;
        }
        .collect-icon {
          display: inline-block;
          position: absolute;
          right: 18px;
          top: 18px;
          text-align: center;
          i {
            display: inline-block;
            color: #d4d6d9;
            font-size: 24px;
            margin-left: 5px;
            margin-bottom: 8px;
            &.active {
              color: #f01414;
            }
          }
          .text {
            font-size: 10px;
            line-height: 10px;
            color: #4d555d;
          }
        }
      }
      .param {
        display: flex;
        .left, .middle, .right {
          display: inline-block;
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,.1);
        }
        .left, .middle, .right {
          .text {
            display: block;
            margin-top: 18px;
            margin-bottom: 4px;
            color: #93999f;
            font-size: 10px;
            line-height: 10px;
          }
          .price {
            font-size: 10px;
            color: #07111b;
            font-weight: 200;
            line-height: 24px;
            margin-bottom: 18px;
            .num {
              font-size: 24px;
            }
          }
        }
        .right {
          border-right: none;
        }
      }
    }
    .notice {
      padding: 18px 18px 0;
      .title {
        font-size: 14px;
        color: #07111b;
        line-height: 14px;
        margin-bottom: 12px;
      }
      .text {
        padding: 8px 0 16px 12px;
        font-size: 12px;
        line-height: 24px;
        font-weight: 200;
        color: #f01212;
        border-bottom: 1px solid rgba(7,17,27,.1);
      }
      .support {
        padding: 16px 12px;
        border-bottom: 1px solid rgba(7,17,27,.1);
        &:last-child {
          border: none;
        }
        .icon {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 4px;
          background-size: 18px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
          &.decrease {
            background-image: url("./img/decrease_1@2x.png");
          }
          &.discount {
            background-image: url("./img/discount_1@2x.png");
          }
          &.invoice {
            background-image: url("./img/invoice_1@2x.png");
          }
          &.guarantee {
            background-image: url("./img/guarantee_1@2x.png");
          }
          &.special {
            background-image: url("./img/special_1@2x.png");
          }
        }
        .description {
          font-size: 12px;
          line-height: 16px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
    .photo {
      padding: 18px;
      .title {
        font-size: 14px;
        margin-bottom: 12px;
        color: #07111b;
        line-height: 14px;
      }
      .pic-wrapper {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        .pic-list {
          font-size: 0px;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            img {
              display: inline-block;
              width: 120px;
              height: 90px;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      .title {
        font-size: 14px;
        color: #07111b;
        line-height: 14px;
        margin-bottom: 12px;
      }
      .item {
        font-size: 12px;
        line-height: 16px;
        color: #07111b;
        padding: 16px 12px;
        font-weight: 200;
        border-bottom: 1px solid rgba(7,17,27,.1);
        &:last-child {
          border: none;
        }
      }
    }
  }
</style>
