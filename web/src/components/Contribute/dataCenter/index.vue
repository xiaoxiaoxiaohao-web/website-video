<template>
  <div class="dataCenter">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="视频数据" key="1"><videoData></videoData></a-tab-pane>
      <!-- <a-tab-pane tab="专栏数据" key="2">专栏数据</a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script>
import videoData from './videoData'
export default {
  name: 'dataCenter',
  components: {
    videoData
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.ant-tabs /deep/ .ant-tabs-nav-wrap {
  text-align: center;
  font-size: 12px;
}
</style>
