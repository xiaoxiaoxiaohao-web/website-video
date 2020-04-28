<template>
  <div class="sourceManuscript">
    <div class="barChart" ref="barChart"></div>
    <div class="bar-info">
      <div class="info-card" v-for="(val, index) in seriesData" :key="index" v-show="more? index < 10 : index < 3">
        <div class="color-label" :style="'background:' + seriesColor[index]"></div>
        <div class="rank">{{index + 1}}</div>
        <div class="detail-info">
          <h3>{{val.name}}</h3>
          <p>发布时间：time</p>
        </div>
        <div class="play-page">
          <a-button><a-icon type="play-circle" />去播放页</a-button>
        </div>
      </div>
      <div class="expand-more" @click="onExpandMoreClick">
        <p>展开更多</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sourceManuscript',
  data () {
    return {
      barChart: null,
      barOption: {},
      seriesData: [
        {value: 635, name: 'cpcpc'},
        {value: 310, name: '视频2-这个小子fsdfdfsagdgdg'},
        {value: 234, name: '视频3'},
        {value: 135, name: '视频4'},
        {value: 548, name: '视频5'},
        {value: 234, name: '视频6'},
        {value: 135, name: '视频7-这个小子fsdfdfsagdgdg'},
        {value: 548, name: '视频8'},
        {value: 135, name: '视频9-这个小子fsdfdfsagdgdg'},
        {value: 548, name: '视频10'}
      ],
      seriesColor: ['#71B8EF', '#86EDEE', '#7AD97C', '#FFCC33', '#FF9933', '#FF583D', '#FF74A5', '#EDCBEB', '#6C6F83', '#828ABA'],
      more: false
    }
  },
  created () {
    // this.getTimePeriod()
  },
  mounted () {
    this.getBarEchartsData()
  },
  methods: {
    // 构造扇形图
    getBarEchartsData () {
      this.barChart = this.$echarts.init(this.$refs.barChart)
      this.barOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>播放数量: {c} <br/> 播放占比: {d}%'
        },
        series: [
          {
            name: '视频播放量',
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: { // 显示白色从而消失看不见
                show: false,
                position: 'right',
                color: '#FFF'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.seriesData,
            color: this.seriesColor
          }
        ]
      }
      this.barChart.clear()
      this.barChart.setOption(this.barOption)
    },
    // 展开更多按钮事件
    onExpandMoreClick () {
      this.more = !this.more
    }
  }
}
</script>

<style lang="less" scoped>
.sourceManuscript {
  display: flex;
  .barChart {
    width: 400px;
    height: 300px;
  }
}
.bar-info {
  margin-left: 20px;
  width: 100%;
  .info-card {
    height: 80px;
    margin: 5px 0;
    border: 1px solid #f1f3f7;
    display: flex;
    .color-label {
      width: 20px;
    }
    .rank {
      width: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      font-style: italic;
      color: #bebebe;
    }
    .detail-info {
      margin: 10px 0;
      & > h3 {
        &:hover {
          cursor: pointer;
          color: #00a1d6;
        }
      }
      & > p {
        margin-top: 5px;
        font-size: 13px;
      }
    }
    .play-page {
      margin-left: auto;
      line-height: 80px;
    }
  }
  .expand-more {
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #a2a2a2;
    background-color: #fafafa;
    border: 1px solid #f1f3f7;
    cursor: pointer;
  }
}
.ant-btn {
  border: white;
  &:hover {
    background-color: #00A1D6;
    color: #FFF;
  }
}
</style>
