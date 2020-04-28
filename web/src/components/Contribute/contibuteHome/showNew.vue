<template>
  <div class="showNew">
    <div class="new-header">
      <div class="choose-title">
        <span :class="[choose ? 'choose': '' ]" @click="onNewMessageClick">评论</span>
        <span :class="[!choose ? 'choose': '' ]" @click="onNewBarrageClick">弹幕</span>
      </div>
      <div class="more" @click="onMoreClick">
        <span>更多</span><a-icon type="right" />
      </div>
    </div>
    <div class="new-content">
      <div class="new-card" v-for="(val, index) in showData" :key="index" v-if="index < 3">
        <div class="card-avatar">
          <a-avatar :size="32" :src="'http://localhost:3001/portrait/' + val.avatar + '.jpg'" />
        </div>
        <div class="card-info">
          <p>{{val.username}} · {{val.datetime || val.sendtime}} </p>
          <h3>{{val.content || val.txt}}</h3>
          <div class="info-source">
            来源: <span @click="onVideoPlayerClick(val.vID)">{{val.title}}</span>
          </div>
        </div>
      </div>
      <a-empty v-if="showData.length <= 0">
        <span slot="description"> 暂无数据 </span>
      </a-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: 'showNew',
  data () {
    return {
      choose: true,
      showData: []
    }
  },
  created () {
    this.onNewMessageClick()
  },
  methods: {
    // 选择评论
    onNewMessageClick () {
      this.choose = true
      this.setMessageData()
    },
    // 选择弹幕
    onNewBarrageClick () {
      this.choose = false
      this.setBarrageData()
    },
    // 评论数据连接
    setMessageData () {
      let ID = this.$route.query.ID
      this.$API.use('list/messageList', {ID: ID}, this.getMessageData)
    },
    // 获取最新评论
    getMessageData (res) {
      this.showData = []
      if (res.state === '1') {
        res.data.forEach(element => {
          element.datetime = this.$moment(element.datetime).format('YYYY-MM-DD HH:mm:ss')
          this.showData.push(element)
        })
      } else {
        console.log('获取最新评论失败', res.err)
      }
    },
    // 弹幕数据连接
    setBarrageData () {
      let ID = this.$route.query.ID
      this.$API.use('list/barrageList', {ID: ID}, this.getBarrageData)
    },
    // 获取最新弹幕
    getBarrageData (res) {
      this.showData = []
      if (res.state === '1') {
        res.data.forEach(element => {
          element.datetime = this.$moment(element.datetime).format('YYYY-MM-DD HH:mm:ss')
          this.showData.push(element)
        })
      } else {
        console.log('获取最新弹幕失败', res.err)
      }
    },
    // 更多
    onMoreClick () {
      let ID = this.$route.query.ID
      if (this.choose === true) { // 评论
        this.$router.push({path: '/contribute/message', query: {ID: ID}})
      } else { // 弹幕
        this.$router.push({path: '/contribute/barrage', query: {ID: ID}})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.showNew {
  width: 100%;
  background-color: white;
  padding: 15px 30px;
  .new-header {
    height: 30px;
    display: flex;
    .choose-title {
      width: 50%;
      & > span {
        margin-left: 50px;
        color: #212121;
        &:hover {
          cursor: pointer;
          color: #00a1d6;
        }
      }
      .choose {
        color: #00a1d6;
      }
    }
    .more {
      width: 50%;
      text-align: right;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .new-content {
    display: flex;
    .new-card {
      width: calc(100% / 3);
      display: flex;
      .card-info {
        width: 100%;
        padding-left: 20px;
        .info-source {
          margin-top: 20px;
          border-top: 1px solid #f4f4f4;
          height: 50px;
          width: calc(100% - 50px);
          line-height: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
          white-space: nowrap;
          & > span:hover {
            cursor: pointer;
            color: #00a1d6;
          }
        }
      }
    }
  }
}
</style>
