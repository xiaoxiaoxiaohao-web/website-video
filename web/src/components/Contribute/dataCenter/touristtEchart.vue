<template>
  <div class="touristtEchart" ref="echart">

  </div>
</template>

<script>
export default {
  name: 'touristtEchart',
  props: {
    titleText: '',
    seriesData: {
      default: [{value: '100', name: '暂无数据'}]
    },
    seriesColor: {
      default: ['#c2c2c2']
    }
  },
  data () {
    return {
      chart: null,
      option: {}
    }
  },
  watch: {
    seriesData: {
      immediate: true,
      deep: true,
      handler (newVal) {
        this.getEchartsData()
      }
    }
  },
  mounted () {
    this.getEchartsData()
  },
  methods: {
    // 构造扇形图
    getEchartsData () {
      this.chart = this.$echarts.init(this.$refs.echart)
      this.option = {
        title: {
          show: true,
          text: this.titleText,
          textStyle: {
            fontSize: 15,
            fontWeight: 'normal'
          },
          left: '43%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} {d}%'
        },
        legend: {
          orient: 'vertical',
          right: 0,
          itemWidth: 10,
          itemHeight: 10
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
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
      this.chart.clear()
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="less" scoped>
.touristtEchart {
  width: 500px;
  height: 300px;
}
</style>
