<template>
  <div class="header-bar">
    <i class="icon-arrow_lift" @click="back"></i>
    <h1>{{text}}</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    text: {
      type: String,
      default: '商家列表'
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
  .header-bar {
    height: 42px;
    width: 100%;
    line-height: 42px;
    text-align: center;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid rgba(7,17,27,.1);
    z-index: 10;
    i {
      display: block;
      float: left;
      margin: 12px 0 0 15px;
    }
    h1 {
      display: inline-block;
      line-height: 44px;
      font-size: 17px;
      color: #333;
      margin-left: -15px;
    }
  }
</style>
