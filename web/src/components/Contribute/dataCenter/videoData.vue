<template>
  <div class="videoData">
    <div class="data-screening">
      <h3>数据总览</h3>
      <div class="card-group">
        <dataCard v-for="(val, index) in numCardData" :key="index" :title="val" ></dataCard>
      </div>
    </div>
    <div class="increment-data">
      <h3>增量数据-趋势总览<span>各维度每日中午12:00更新前一日数据</span></h3>
      <lineEcharts></lineEcharts>
    </div>
    <div class="source-manuscript">
      <h3>来源稿件<span>各维度每日中午12:00更新前一日数据</span></h3>
      <sourceManuscript></sourceManuscript>
    </div>
    <div class="proportion-rank">
      <h3>我在各分区中占比排行<span>我在各区新增播放排名情况统计</span></h3>
      <proportionRank></proportionRank>
    </div>
    <div class="tourist-attribute">
      <h3>游客基本属性</h3>
      <div class="echart-group">
        <touristtEchart :titleText="sexTitle" :seriesData="sexData" :seriesColor="sexColor"></touristtEchart>
        <touristtEchart :titleText="ageTitle" :seriesData="ageData" :seriesColor="ageColor"></touristtEchart>
      </div>
    </div>
    <div class="label-map">
      <h3>标签地图<span>观众喜欢看的标签</span></h3>
      <labelMap></labelMap>
    </div>
  </div>
</template>

<script>
// import numCard from './numCard'
import dataCard from '../contibuteHome/dataCard'
import lineEcharts from './lineEcharts'
import sourceManuscript from './sourceManuscript'
import proportionRank from './proportionRank'
import touristtEchart from './touristtEchart'
import labelMap from './labelMap'
export default {
  name: 'videoData',
  components: {
    dataCard,
    lineEcharts,
    sourceManuscript,
    proportionRank,
    touristtEchart,
    labelMap
  },
  data () {
    return {
      // numCardData: ['视频播放', '评论数', '弹幕数', '点赞数', '分享数', '硬币数', '收藏数', '充电数'],
      numCardData: ['视频播放', '评论数', '弹幕数'],
      sexTitle: '性别占比',
      sexData: [
        {value: 55, name: '男性观众'},
        {value: 45, name: '女性观众'}
      ],
      sexColor: ['#57CAFF', '#FF87B1'],
      ageTitle: '观众年龄',
      ageData: [
        {value: 155, name: '0-16岁'},
        {value: 565, name: '16-29岁'},
        {value: 175, name: '29-45岁'},
        {value: 95, name: '45岁以上'}
      ],
      ageColor: ['#92DDFF', '#43C1FB', '#4391FB', '#6485F0']
    }
  }
}
</script>

<style lang="less" scoped>
.videoData {
  padding: 15px 10%;
  & > div {
    margin-bottom: 30px;
    & > h3 {
      display: flex;
      & > span {
        font-size: 12px;
        line-height: 25px;
        margin-left: auto;
        color: #99a2aa;
      }
    }
  }
  .echart-group {
    display: flex;
  }
  .card-group {
    display: flex;
    flex-wrap: wrap;
  }
  .label-map {
    span {
      margin-left: 30px;
    }
  }
}
</style>
