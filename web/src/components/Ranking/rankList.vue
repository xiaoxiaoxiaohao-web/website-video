<template>
  <div class="rankList">
    <div class="rank-item" v-for="(val, i) in listData" :key="i" v-if="listData.length > 0">
      <div class="item-num">{{i + 1}}</div>
      <div class="item-content">
        <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="图片" @click="onVideoPlayerClick(val.vID)">
        <div class="info">
          <h4 @click="onVideoPlayerClick(val.vID)" >{{val.title}}</h4>
          <p>
            <span v-if="val.broadcast > 10000">播放量：{{(val.broadcast/10000).toFixed(1)}}万</span>
            <span v-else>播放量：{{val.broadcast}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>讨论量：{{val.message}}</span>
            <!-- <span @click="onMakerClick(val.maker)">作者： {{val.maker}}</span> -->
          </p>
        </div>
        <div class="grade">
          <h3>{{val.grade}}</h3>
          <p>综合得分</p>
        </div>
      </div>
    </div>
    <a-empty v-else>
      <span slot="description"> 暂无数据 </span>
    </a-empty>
  </div>
</template>

<script>
export default {
  name: 'rankList',
  props: ['label'],
  data () {
    return {
      listData: []
    }
  },
  watch: {
    label: {
      immediate: true,
      handler (newVal) {
        this.setLabelVideoData(newVal)
      }
    }
  },
  methods: {
    setLabelVideoData (label) {
      this.$API.use('list/labelList', {label: label}, this.getLabelVideoData)
    },
    // 获取排行榜
    getLabelVideoData (res) {
      if (res.state === '1') {
        this.listData = res.data
      } else {
        this.$message.error('请求数据失败')
      }
    }
    // onMakerClick (e) {
    //   let routerUrl = this.$router.resolve({ path: '/information', query: { maker: e } })
    //   window.open(routerUrl.href, '_blank')
    // }
  }
}
</script>

<style lang="less" scoped>
.rankList {
  margin: 20px 10px;
  height: 100%;
}
.rank-item {
  padding-top: 20px;
  height: 110px;
  width: 100%;
  border-bottom: 1px solid #e5e9ef;
  display: flex;

  &:hover {
    box-shadow: 2px 2px 4px #888888;
  }
  .item-num {
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 35px;
  }
  .item-content {
    height: 70px;
    width: calc(100% - 70px);
    display: flex;
    & > img {
      width: 115px;
      height: 70px;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
      }
    }
    .info {
      width: calc(100% - 240px);
      margin: 0 25px;

      h4:hover {
        cursor: pointer;
        color: #00a1d6;
      }
      & > p {
        margin-top: 20px;

        span:last-child:hover {
          cursor: pointer;
          color: #00a1d6;
        }
      }
    }
    .grade {
      width: 200px;
      margin-top: 20px;
      position: relative;
      top: 20px;
      text-align: center;
      & > h3 {
        color: #00a1d6;
        font-weight: 900;
      }
    }

  }
}
</style>
