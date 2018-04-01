<template>
  <div class="find">
    <div v-for="(item) in findThings" class="find-item" :key="item.id">
      <find-item :data="item"></find-item>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from '../base/tab-bar/tab-bar'
import FindItem from '../base/find-item/find-item'
import api from '../../api/axios'
export default {
  data () {
    return {
      // 获取得到发现的数组
      findThings: []
    }
  },
  created () {
    this._initData()
  },
  methods: {
    _initData () {
      api.getFindGoodsThing().then(res => {
        console.log(res)
        this.findThings = res.data.data
      })
    }
  },
  components: {
    TabBar,
    FindItem
  }
}
</script>
<style lang="scss" scoped>
  .find {
    margin-bottom: 50px;
  }
</style>
