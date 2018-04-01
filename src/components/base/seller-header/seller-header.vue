<template>
  <div class="seller-header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}} / {{seller.deliveryTime}}</span>分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="detailShow=true">
        <span>{{seller.supports.length}}个活动</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="detailShow=true">
      <span class="brand"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar"/>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="detail-supports" v-if="seller.supports">
              <li class="supports-item" v-for="(item, index) in seller.supports" :key="item.id">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="detail-text">
              <p class="text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="detailShow=false">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    <div class="back" @click="toBack">
      <i class="icon-arrow_lift"></i>
    </div>
  </div>
</template>
<script>
import Star from '../star/star'
export default {
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      detailShow: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    console.log(this.seller, '商家信息')
  },
  components: {
    Star
  },
  methods: {
    toBack () {
      this.$router.push({path: '/index'})
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  .restaurant-detail {
    .seller-header {
      position: relative;
      color: #fff;
      font-weight: 200;
      font-size: 13px;
      background-color: rgba(7,17,27,.5);
      .content-wrap {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0; // 因为元素节点有文本节点，在缩进代码时会占据宽度
        .avatar {
          display: inline-block;
          font-size: 14px;
          vertical-align: top;
          img {
            width: 64px;
            height: 64px;
            border-radius: 2px;
            display: block;
          }
        }
        .content {
          display: inline-block;
          margin-left: 15px;
          .title {
            padding: 2px 0 8px;
            .brand {
              width: 30px;
              height: 18px;
              display: inline-block;
              vertical-align: top;
              background-size: 30px 18px;
              background-repeat: no-repeat;
              @include bg-image('./img/brand');
            }
            .name {
              margin-left: 6px;
              font-size: 16px;
              line-height: 18px;
              font-weight: 800;
            }
          }
          .description {
            margin-bottom: 10px;
            font-size: 13px;
            line-height: 13px;
            /*span {*/
            /**/
            /*}*/
          }
          .supports {
            .icon {
              display: inline-block;
              width: 12px;
              height: 12px;
              margin-right: 4px;
              background-size: 12px 12px;
              background-repeat: no-repeat;
              vertical-align: top;
              &.decrease {
                @include bg-image('./img/decrease_1')
              }
            }
            .text {
              font-size: 10px;
              line-height: 12px;
            }
          }
        }
        .support-count {
          position: absolute;
          right: 12px;
          bottom: 18px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          padding: 0 8px;
          border-radius: 14px;
          background: rgba(0,0,0,.2);
          span {
            line-height: 24px;
            font-size: 10px;
          }
          i {
            position: relative;
            top: 1px;
            font-size: 10px;
            line-height: 24px;
            margin-left: 2px;
          }
        }
      }
      .bulletin-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        @include ellipsis(1);
        background-color: rgba(7, 17, 27, .2);
        .brand {
          display: inline-block;
          width: 22px;
          height: 12px;
          background-size: 22px 12px;
          background-repeat: no-repeat;
          @include bg-image('./img/bulletin');
          margin-top: 7px;
        }
        .text {
          font-size: 10px;
          vertical-align: top;
        }
        i {
          position: absolute;
          right: 12px;
          top: 8px;
          font-size: 10px;
        }
      }
      .background {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          filter: blur(10px);
        }
      }
      .back {
        position: fixed;
        right: 19px;
        top: 25px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(0,0,0,.2);
        z-index: 1;
        i {
          font-size: 20px;
          padding: 7px;
          display: block;
        }
      }
      .detail {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
        overflow: auto;
        background-color: rgba(7, 17, 27, .8);
        .detail-wrapper {
          min-height: 100%;
          .detail-main {
            padding: 64px 0;
            .name {
              text-align: center;
              font-weight: 700;
              font-size: 16px;
              line-height: 16px;
            }
            .star-wrapper {
              margin-top: 18px;
              padding: 2px 0;
              text-align: center;
            }
            .title {
              display: flex;
              width: 80%;
              margin: 28px auto;
              .text {
                padding: 0 12px;
                font-size: 14px;
                text-align: center;
                font-weight: 600;
              }
              .line {
                flex: 1;
                position: relative;
                left: 0;
                top: -8px;
                border-bottom: 1px solid rgba(255, 255, 255, .2);
              }
            }
            .detail-supports {
              width: 80%;
              margin: 0 auto;
              .supports-item {
                padding: 0 12px;
                margin-bottom: 12px;
                .icon {
                  width: 16px;
                  height: 16px;
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                  vertical-align: top;
                  display: inline-block;
                  &.decrease {
                    @include bg-image('./img/decrease_1')
                  }
                  &.discount {
                    @include bg-image('./img/discount_1')
                  }
                  &.guarantee {
                    @include bg-image('./img/discount_1')
                  }
                  &.invoice {
                    @include bg-image('./img/invoice_1')
                  }
                  &.special {
                    @include bg-image('./img/special_1')
                  }
                }
                .text {
                  display: inline-block;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 16px;
                }
              }
            }
            .detail-text {
              display: flex;
              width: 80%;
              margin: 0 auto;
              .text {
                font-weight: 400;
                line-height: 24px;
                font-size: 12px;
                padding: 0 12px;
                text-indent: 2em;
              }
            }
          }
        }
        .detail-close {
          width: 32px;
          height: 32px;
          font-size: 32px;
          position: relative;
          margin: -50px auto 0px;
        }
      }
    }
  }
  // 淡入淡出
  .fade-enter-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
