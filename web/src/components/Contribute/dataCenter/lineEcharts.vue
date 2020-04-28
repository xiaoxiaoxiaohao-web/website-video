<template>
  <div class="lineEcharts" ref="lineChart">
  </div>
</template>

<script>
export default {
  name: 'lineEcharts',
  data () {
    return {
      lineChart: null,
      lineOption: {},
      xAxisData: [],
      seriesData: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901]
    }
  },
  created () {
    this.getTimePeriod()
  },
  mounted () {
    this.getLineEchartsData()
  },
  methods: {
    // 获取最近时间段
    getTimePeriod () {
      for (let i = 0; i < 10; i++) { // 获取十天时间
        let day = this.$moment().subtract(i, 'days').format('YYYY-MM-DD')
        this.xAxisData.unshift(day)
      }
    },
    // 构造折线图
    getLineEchartsData () {
      this.lineChart = this.$echarts.init(this.$refs.lineChart)
      this.lineOption = {
        grid: {
          left: '60px'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/> 播放：{c}',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#E5E7ED']
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '播放数量'
        },
        series: [{
          data: this.seriesData,
          type: 'line',
          color: '#00a1d6'
        }]
      }
      this.lineChart.clear()
      this.lineChart.setOption(this.lineOption)
    }
  }
}
</script>

<style scoped>
.lineEcharts {
  width: 100%;
  height: 300px;
}
</style>
