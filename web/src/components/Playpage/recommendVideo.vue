<template>
  <div class="recommendVideo">
    <h3>相关推荐</h3>
    <div class="rec-card" v-for="(val, index) in recommendData" :key="index">
      <!-- <img src="@/assets/timg.jpg" alt="推荐视频"> -->
      <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="val.title" @click="onVideoPlayerClick(val.vID)">
      <div class="video-info">
        <h5>{{val.title}}</h5>
        <div class="count-up">{{val.username}}</div>
        <div class="count">{{val.type}}&nbsp;&nbsp;{{val.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommendVideo',
  props: ['type'],
  data () {
    return {
      recommendData: []
    }
  },
  watch: {
    type: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.setRecommendData(newVal)
        }
      }
    }
  },
  methods: {
    // 连接接口
    setRecommendData (type) {
      this.$API.use('video/getTypeData', {type: type}, this.getTypeData)
    },
    // 获取数据
    getTypeData (res) {
      this.recommendData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.recommendVideo {
  width: 100%;
  & > h3 {
    height: 50px;
    line-height: 50px;
  }
  .rec-card {
    width: 320px;
    display: flex;
    padding: 5px 0;
    & > img {
      width: 141px;
      height: 80px;
    }
    .video-info {
      margin-left: 10px;
      width: 179px;
      & > h5 {
        height: 36px;
        line-height: 18px;
        font-size: 14px;
        overflow: hidden;
        &:hover {
          cursor: pointer;
          color: #00a1d6;
          font-weight: 600;
        }
      }
      .count-up {
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .count {
        height: 16px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
