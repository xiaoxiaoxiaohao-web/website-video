<template>
  <div class="showData">
    <div class="data-header">
      <div class="choose-data">
        <span class="choose">视频数据</span>
        <!-- <span>专栏数据</span> -->
      </div>
      <div class="updata-timing" @click="onMoreClick">
        每日中午12点更新昨日数据<a-icon type="right" />
      </div>
    </div>
    <div class="data-content">
      <dataCard v-for="(val, i) in cardData" :key="i" :title="val" v-if="i < 3"></dataCard>
    </div>
  </div>
</template>

<script>
import dataCard from './dataCard'
export default {
  name: 'showData',
  components: {
    dataCard
  },
  data () {
    return {
      // cardData: ['粉丝数', '视频播放', '评论数', '弹幕数', '点赞数', '分享数']
      cardData: ['视频播放', '评论数', '弹幕数']
    }
  },
  methods: {
    // 更多
    onMoreClick () {
      let ID = this.$route.query.ID
      this.$router.push({path: '/contribute/data_core', query: {ID: ID}})
    }
  }
}
</script>

<style lang="less" scoped>
.showData {
  width: 100%;
  background-color: white;
  padding: 15px 30px;

  .data-header {
    height: 30px;
    display: flex;
     .choose-data {
      width: 50%;
      & > span {
        margin-left: 50px;
        color: #00a1d6;
      }
    }
    .updata-timing {
      width: 50%;
      text-align: right;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .data-content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
