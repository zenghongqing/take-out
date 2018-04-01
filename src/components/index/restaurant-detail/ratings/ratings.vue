<!-- 商家模块 评价页面 -->
<template>
  <div class="ratings" ref="ratingsRef">
    <div class="ratings-content">
      <!--概览-->
      <div class="overview">
        <div class="left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="right">
          <div class="service">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="goods">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <cross-line></cross-line>
      <rating-select :ratings="ratings"
                     :onlyContent="onlyContent"
                     @select="select"
                     :selectType="selectType"
                     @switchContent="switchContent"
                     :desc="desc"></rating-select>
      <div class="ratings-wrapper">
        <ul>
          <li class="ratings-item" v-for="item in ratings" :key="item.id" v-show="needShow(item.rateType, item.text)">
            <div class="avatar">
              <img :src="item.avatar"/>
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="item.score"></star>
                <span class="delivery">{{item.deliveryTime}}</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend" v-show="item.recommend && item.recommend.length">
                <i class="icon-thumb_up"></i>
                <span v-for="item1 in item.recommend" :key="item1" class="item">{{item1}}</span>
              </div>
              <div class="time">
                {{item.rateTime | moment}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import moment from 'moment'
import Star from '../../../base/star/star'
import api from '../../../../api/axios'
import CrossLine from '../.././../base/cross-line/cross-line'
import RatingSelect from '../../../base/rating-select/ratings-select'
const ALL = 2
export default {
  data () {
    return {
      // 默认选择所有评价
      selectType: ALL,
      // ratings-select 界面组件文字
      desc: {
        all: '全部',
        positive: '好评',
        negative: '吐槽'
      },
      // 只显示有内容的评价
      onlyContent: false,
      // 评价内容
      ratings: []
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Star,
    CrossLine,
    RatingSelect
  },
  created () {
    this._initData()
  },
  filters: {
    moment (time) {
      return moment(time).format('YYYY-MM-DD, hh-mm')
    }
  },
  methods: {
    // 组件间通讯 ratings-select
    select (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    switchContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    _initData () {
      api.getRatingsData().then((res) => {
        if (res.data && res.data.data) {
          this.ratings = res.data.data
          console.log(this.ratings)
        }
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratingsRef, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    needShow (type, content) {
      if (this.onlyContent && !content) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .ratings {
    position: absolute;
    left: 0;
    top: 174px;
    bottom: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .ratings-content {
      .overview {
        display: flex;
        padding: 18px 0;
        .left {
          flex: 0 0 137px;
          width: 137px;
          padding: 6px 0;
          border-right: 1px solid rgba(7,17,27,.1);
          text-align: center;
          .score {
            line-height: 24px;
            color: #f90;
            font-size: 24px;
            margin-bottom: 6px;
          }
          .title {
            font-size: 12px;
            line-height: 12px;
            color: #07111b;
            margin-bottom: 8px;
          }
          .rank {
            line-height: 10px;
            font-size: 10px;
            color: #93999f;
          }
        }
        .right {
          flex: 1;
          padding: 6px 0 6px 24px;
          .service, .goods {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 0;
            .title {
              font-size: 12px;
              color: #07111b;
            }
            .score {
              font-size: 12px;
              color: #f90;
            }
            .star {
              display: inline-block;
              margin: 0 12px;
              vertical-align: top;
            }
          }
          .delivery {
            line-height: 18px;
            font-size: 0;
            .title {
              font-size: 12px;
              color: #07111b;
            }
            .time {
              font-size: 12px;
              color: #93999f;
              margin: 0 12px;
            }
          }
        }
      }
      .ratings-wrapper {
        padding: 0 18px;
        .ratings-item {
          display: flex;
          padding: 18px 0;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          .avatar {
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img {
              width: 28px;
              height: 28px;
              border-radius: 50%;
            }
          }
          .content {
            flex: 1;
            position: relative;
            .name {
              font-size: 10px;
              margin-bottom: 4px;
              line-height: 12px;
              color: #07111b;
            }
            .time {
              position: absolute;
              right: 0px;
              top: 0px;
              font-size: 10px;
              line-height: 12px;
              color: #93999f;
            }
            .star-wrapper {
              margin-bottom: 4px;
              font-size: 0px;
              .star {
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
              }
            }
            .text {
              line-height: 18px;
              font-size: 14px;
              color: #07111b;
              margin-bottom: 8px;
            }
            .recommend {
              line-height: 16px;
              i {
                line-height: 18px;
                margin: 0 8px 4px 0;
                color: #00a0dc;
              }
              .item {
                margin-right: 15px;
                font-size: 10px;
                padding: 0 6px;
                border: 1px solid rgba(7,17,27,.1);
                border-radius: 5px;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
