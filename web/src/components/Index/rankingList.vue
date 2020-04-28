<template>
  <div class="rankingList">
    <h2>
      <span>排行榜</span>
      <!-- <a-button size="small" @click="onMoreClick">更多<a-icon type="right" /></a-button> -->
    </h2>
    <div class="rankingList-content">
      <div class="ranking" v-for="(val, i) in rankData" :key="i" @mouseenter="onListFocues" @click="onVideoPlayerClick(val.vID)">
        <span :class="i + 1 < 4 ? 'front-span' : 'span'">{{i + 1}}</span>
        <p>{{val.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankingList',
  data () {
    return {
      cardShow: false,
      rankData: []
    }
  },
  created () {
    this.setMoviesListData()
  },
  methods: {
    onListFocues () {
      this.cardShow = true
    },
    // 科技列表接口
    setMoviesListData () {
      let type = '科技'
      this.$API.use('list/moviesList', {type: type, num: 10}, this.getMoviesListData)
    },
    // 获取科技列表数据
    getMoviesListData (res) {
      this.rankData = res.data
    }
    // // 更多
    // onMoreClick () {
    //   let routerUrl = this.$router.resolve({path: '/ranking', query: {type: 2}})
    //   window.open(routerUrl.href, '_blank')
    // }
  }
}
</script>

<style lang="less" scoped>
.ant-btn {
  position: relative;
  left: 60%;
}
.rankingList-content {
  margin-top: 18px;
}
.ranking {
  height: 40px;
  display: flex;
  &:hover {
    color: #00a1d6;
    font-size: 16px;
    font-weight: 600;
  }
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 10px;
    text-align: center;
    border-radius: 3px;
  }
  .front-span {
    background: #00a1d6;
    color: white;
  }
  p {
    width: calc(100% - 40px);
    height: 20px;
    cursor: pointer;
    overflow: hidden;
  }
}
</style>
