<template>
  <div class="contentManagement">
    <div class="manuscript-header">
      <div class="header-title">
        <a>视频管理</a>
      </div>
    </div>
    <div class="manuscript-content">
      <processTabs></processTabs>
    </div>
  </div>
</template>

<script>
import processTabs from './processTabs'
export default {
  name: 'contentManagement',
  components: {processTabs},
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.contentManagement {
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
.manuscript-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  position: fixed;
  z-index: 1000;
  .header-title {
    padding-left: calc(50% - 240px);
    border-bottom: 1px solid #e7e7e7;
    & > a {
      display: inline-block;
      width: 120px;
      height: 48px;
      text-align: center;
    }
  }
}
.manuscript-content {
  padding: 60px 10%;
}
</style>
