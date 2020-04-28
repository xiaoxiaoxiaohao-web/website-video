<template>
  <div class="timeTable">
    <a-tabs defaultActiveKey="0">
      <a-tab-pane tab="最新" key="0" class="pane">
        <div class="timeTable-card" v-for="(val, i) in newCardData" :key="i">
          <img :src="require('@/assets/opera/' + val.src + '.jpg')" alt="番剧">
          <div class="card-info">
            <h4>{{val.name}}</h4>
            <a>第{{val.episode}}话</a>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="周一" key="1">周一</a-tab-pane>
      <a-tab-pane tab="周二" key="2">周二</a-tab-pane>
      <a-tab-pane tab="最三" key="3">周三</a-tab-pane>
      <a-tab-pane tab="周四" key="4">周四</a-tab-pane>
      <a-tab-pane tab="周五" key="5">周五</a-tab-pane>
      <a-tab-pane tab="周六" key="6">周六</a-tab-pane>
      <a-tab-pane tab="周日" key="7">周日</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'timeTable',
  data () {
    return {
      newCardData: [
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-2', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-3', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-4', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-5', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-6', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-5', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-6', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'},
        {src: '1-1', name: '花牌情缘 第三季 （仅限台湾地区）', episode: '6'}
      ]
    }
  }
}
</script>

<style scoped>
.ant-tabs {
  margin-left: -120px;
}
.ant-tabs >>> .ant-tabs-bar {
  margin: 0 0 8px 100px ;
  border-bottom: none;
}
.ant-tabs >>> .ant-tabs-tab {
  margin: 0 10px;
  padding: 5px;
}
.ant-tabs >>> .ant-tabs-content {
  height: 400px;
}
.timeTable {
  width: 100%;
}
.pane {
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
}
.pane > .timeTable-card {
  display: flex;
  width: calc(100% / 3);
  height: 70px;
  margin-bottom: 30px;
}
.timeTable-card img {
  width: 70px;
  height: 70px;
}
.card-info {
  width: 140px;
  height: 70px;
  margin-left: 20px;
}

</style>
