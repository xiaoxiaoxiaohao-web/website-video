<template>
  <div class="towntalk">
    <h4><slot></slot><span>更多<a-icon type="right" /></span></h4>
    <div v-for="(v,i) in towntalkData" :key="i">#{{v}}#</div>
  </div>
</template>

<script>
export default {
  name: 'towntalk',
  props: ['towntalkData'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.towntalk {
  margin-top: 10px;
  padding: 0 15px 10px 15px;
  h4 {
    height: 39px;
    line-height: 39px;

    span {
      float: right;
      color: #99A2AA;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        color: #00A1D6;
      }
    }
  }
  & > div {
    height: 33px;
    line-height: 33px;
    color: #00A1D6;
    cursor: pointer;
    &:hover {
      color: #82a8fb;
    }
  }
}
</style>
