<template>
  <div class="type-item" @click="toList">
    <img :src="ico"/>
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    ico: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    toList () {
      this.$emit('toList')
    }
  },
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>
<style lang="scss" scoped>
  .type-item {
    float: left;
    width: 25%;
    padding-top: 14px;
    img {
      display: block;
      width: 50px;
      margin:0 auto 12px;
    }
    span {
      display: block;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
    }
  }
</style>
