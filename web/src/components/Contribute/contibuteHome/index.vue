<template>
  <div class="contibuteHome">
    <currentTime></currentTime>
    <carousel :carouselData="carouselData"></carousel>
    <showData></showData>
    <showNew></showNew>
  </div>
</template>

<script>
import carousel from '@/components/Public/carousel'
import currentTime from './currentTime'
import showData from './showData'
import showNew from './showNew'
export default {
  name: 'contibuteHome',
  components: {
    carousel,
    currentTime,
    showData,
    showNew
  },
  data () {
    return {
      carouselData: []
    }
  },
  created () {
    this.setCarouselData('3')
  },
  methods: {
    // 轮播图数据接口
    setCarouselData (team) {
      this.$API.use('video/getCarouselImg', {team: team}, this.getCarouselData)
    },
    // 获取轮播图数据
    getCarouselData (res) {
      if (res.state === '1') {
        this.carouselData = res.data
      } else {
        console.log('轮播图数据出现错误', res.err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.contibuteHome {
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  padding: 20px 60px 0 60px;
  & > div {
    margin-bottom: 30px;
  }
  .carousel {
    width: 100%;
    height: 280px ;
    margin-right: 50px;
  }
}

</style>
