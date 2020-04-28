<template>
  <div class="moviesMenu">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="影视排行" key="1">
        <moviesRank></moviesRank>
      </a-tab-pane>
      <!-- <a-tab-pane tab="关注的主播" key="2" forceRender>没有关注的主播</a-tab-pane> -->
      <a-tab-pane tab="为你推荐" key="3">
        <carousel :carouselData="carouselData"></carousel>
        <div class="lives">
          <img src="@/assets/live-pic.png" alt="相薄">
          <img src="@/assets/live-video.png" alt="小视频">
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import moviesRank from './moviesRank'
import carousel from '@/components/Public/carousel'
export default {
  name: 'moviesMenu',
  components: {
    moviesRank,
    carousel
  },
  data () {
    return {
      carouselData: []
    }
  },
  created () {
    this.setCarouselData('2')
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

<style scoped>
.ant-tabs >>> .ant-tabs-bar {
  margin: 0 0 8px 0 ;
  border-bottom: none;
}
.ant-tabs >>> .ant-tabs-tab {
  margin: 0;
  padding: 12px 8px;
}
.carousel {
  width: 100%;
  height: 280px ;
  margin-right: 50px;
}
.lives {
  display: flex;
  margin-top: 20px;
  height: 60px;
}
.lives > img {
  width: 40%;
  margin-right: 10%;
}
</style>
