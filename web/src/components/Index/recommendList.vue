<template>
  <div class="recommendList">
    <a-button>在线广告</a-button>
    <img :src="adverImg" alt="广告">
  </div>
</template>

<script>
export default {
  name: 'recommendList',
  data () {
    return {
      adverImg: ''
    }
  },
  created () {
    this.setBackgroundImg('3-1')
  },
  methods: {
    // 广告图接口
    setBackgroundImg (team) {
      this.$API.use('video/getBackgroundImg', {team: team}, this.getBackgroundImg)
    },
    // 获取广告图
    getBackgroundImg (res) {
      if (res.state === '1') {
        this.adverImg = 'http://localhost:3001/carousel/' + res.data[0].name + '.jpg'
      } else {
        this.adverImg = '@/assets/timg.jpg'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommendList {
  width: 100%;

  .ant-btn {
    width: 100%;
    background: #f4f4f4;
  }
  img {
    margin-top: 18px;
    width: 100%;
    height: 185px;
  }
}
</style>
