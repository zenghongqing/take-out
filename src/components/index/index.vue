<template>
  <div class="index">
    <!--定位搜索框-->
    <location-search></location-search>
    <!--轮播图-->
    <div class="slider">
      <mt-swipe :auto="10000" :show-indicators="false">
        <mt-swipe-item v-for="item in swipeData" :key="item.id"><img :src="item.pic"></mt-swipe-item>
      </mt-swipe>
    </div>
    <!--种类-->
    <div class="types">
      <type-item v-for="item in typesData" :key="item.id" :ico="item.ico" :text="item.text" @toList="toList(item)"></type-item>
    </div>
    <!-- 横线分隔条 -->
    <cross-line></cross-line>
    <!--附近商家-->
    <div class="nearby">
      <title-bar text="附近商家"></title-bar>
      <seller-list-item v-for="item in indexList" :key="item.name" :data="item" @toRestaurant="toRestaurant"></seller-list-item>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from '../base/tab-bar/tab-bar'
import TypeItem from '../base/type-item/type-item'
import CrossLine from '../base/cross-line/cross-line'
import SellerListItem from '../base/seller-list-item/seller-list-item'
import TitleBar from '../base/title-bar/title-bar'
import LocationSearch from '../base/location-search/location-search'
import api from '../../api/axios'
export default {
  data () {
    return {
      swipeData: [{
        pic: require('./img/swipe/1.jpg')
      }, {
        pic: require('./img/swipe/2.png')
      }, {
        pic: require('./img/swipe/3.jpg')
      }, {
        pic: require('./img/swipe/bannertemp.e8a6fa63.jpg')
      }],
      typesData: [
        {
          ico: require('./img/type/types (0).png'),
          text: '美食'
        },
        {
          ico: require('./img/type/types (1).png'),
          text: '猫眼电影'
        },
        {
          ico: require('./img/type/types (2).png'),
          text: '休闲娱乐'
        },
        {
          ico: require('./img/type/types (3).png'),
          text: '外卖'
        },
        {
          ico: require('./img/type/types (4).png'),
          text: 'KTV'
        },
        {
          ico: require('./img/type/types (5).png'),
          text: '周边游'
        },
        // {
        //   ico: require('./img/type/type (7).svg'),
        //   text: '西餐'
        // },
        {
          ico: require('./img/type/types (6).png'),
          text: '小吃快餐'
        },
        {
          ico: require('./img/type/types (7).png'),
          text: '机票/火车票'
        }
      ],
      indexList: []
    }
  },
  components: {
    TabBar,
    TypeItem,
    CrossLine,
    SellerListItem,
    TitleBar,
    LocationSearch
  },
  created () {
    this.getInitList()
  },
  methods: {
    toList () {
      this.$router.push({path: '/restaurant_list'})
    },
    // 初始化列表数据
    getInitList () {
      api.getIndexList().then((res) => {
        // console.log(res)
        this.indexList = res.data.indexList.data.poilist
      })
    },
    toRestaurant () {
      this.$router.push({path: '/restaurant'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .index {
    .slider {
      height: 170px;
      font-size: 30px;
      text-align: center;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .types {
      position: relative;
      overflow: hidden;
      background: #fff;
      padding-bottom: 20px;
    }
    .nearby {
      margin-bottom: 50px;
      background: #fff;
    }
  }
</style>
