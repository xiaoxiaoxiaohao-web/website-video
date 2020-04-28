<template>
  <div class="moviesRank">
    <div class="ranking" v-for="(val, i) in rankData" :key="i" @click="onVideoPlayerClick(val.vID)">
      <div class="ranking-info" :title="val.title">
        <span :class="i + 1 < 4 ? 'front-span' : 'span'">{{i + 1}}</span>
        <!-- <img :src="require('@/assets/live/' + val.portrait)" alt="排行榜头像"> -->
        <div class="anchor-info">
          <h3>{{val.title}}</h3>
          <p>{{val.synopsis}}</p>
        </div>
      </div>
      <div class="line-num">
        <!-- <a-icon type="usergroup-add" style="fontSize: 18px" /> -->
        <a-icon type="play-circle" style="fontSize: 18px" />
        <a v-if="val.broadcast > 10000">{{(val.broadcast/10000).toFixed(1)}}万</a>
        <a v-else>{{val.broadcast}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moviesRank',
  data () {
    return {
      rankData: []
    }
  },
  created () {
    this.setMoviesListData()
  },
  methods: {
    // 影视列表接口
    setMoviesListData () {
      let type = '影视'
      this.$API.use('list/moviesList', {type: type, num: 6}, this.getMoviesListData)
    },
    // 获取影视列表数据
    getMoviesListData (res) {
      this.rankData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.moviesRank {
  width: 100%;
  height: 380px;
}
.ranking {
  height: 65px;
  display: flex;
  .ranking-info {
    margin-left: 10px;
    display: flex;
    width: 70%;
    height: 45px;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 15px 10px;
      text-align: center;
      border-radius: 3px;
    }
    .front-span {
      background: #00a1d6;
      color: white;
    }
    // img {
    //   width: 45px;
    //   height: 45px;
    //   border-radius: 50%;
    // }
    .anchor-info {
      width: 68%;
      margin-left: 10px;
      & > h3 {
        height: 30px;
        line-height: 30px;
        overflow: hidden;
      }
      & > p {
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        overflow: hidden;
      }
    }
  }
  .line-num {
    width: 32%;
    height: 45px;
    line-height: 45px;
    text-align: right;
  }
}
</style>
