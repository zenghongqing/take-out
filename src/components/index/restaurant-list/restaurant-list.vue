<template>
  <div class="restaurant-list">
    <head-bar @back="back"></head-bar>
    <seller-list-item v-for="item in restarauntList" :key="item.name" :data="item" @toRestaurant="toRestaurant"></seller-list-item>
  </div>
</template>
<script>
import HeadBar from '../../base/header-bar/header-bar'
import SellerListItem from '../../base/seller-list-item/seller-list-item'
import api from '../../../api/axios'
export default {
  data () {
    return {
      restarauntList: []
    }
  },
  created () {
    this.getRestaurantList()
  },
  components: {
    HeadBar,
    SellerListItem
  },
  methods: {
    back () {
      this.$router.push('/index')
    },
    getRestaurantList () {
      api.getRestaurantList().then((res) => {
        if (res.data.restaurantList && res.data.restaurantList.data && res.data.restaurantList.data.poilist) {
          this.restarauntList = res.data.restaurantList.data.poilist
        }
      })
    },
    toRestaurant () {
      this.$router.push({path: '/restaurant'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .restaurant-list {
    margin-top: 42px;
    background: #fff;
  }
</style>
