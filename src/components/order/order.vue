<template>
  <div class="order">
    <div v-for="data in orderData" :key="data.id">
      <order-item :data="data"></order-item>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from '../base/tab-bar/tab-bar'
import OrderItem from '../base/order-item/order-item'
import api from '../../api/axios'
export default {
  data () {
    return {
      orderData: []
    }
  },
  created () {
    this._initData()
  },
  methods: {
    _initData () {
      api.getIndexList().then((res) => {
        this.orderData = res.data.indexList.data.poilist
      })
    }
  },
  components: {
    TabBar,
    OrderItem
  }
}
</script>
