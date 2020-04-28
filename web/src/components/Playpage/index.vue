<template>
  <div class="Playpage">
    <navMenu></navMenu>
    <div class="page-content">
      <div class="content-left">
        <div class="video-info">
          <h2 :title="videoInfo.title">{{videoInfo.title}}</h2>
          <div class="type-time">
            <span @click="onTypeClick(videoInfo.type)">{{videoInfo.type}}>{{videoInfo.label}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{videoInfo.time}}</span>
          </div>
          <div class="play-bullet">
            <span>{{videoInfo.broadcast || 0}}播放</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{videoInfo.barrage || 0}}弹幕</span>
          </div>
        </div>
        <vPlayer :videoInfo="videoInfo"></vPlayer>
        <comment :vID="videoInfo.vID"></comment>
      </div>
      <div class="content-right">
        <playerInfo :ID="videoInfo.ID"></playerInfo>
        <barrageList :vID="videoInfo.vID"></barrageList>
        <recommendVideo :type="videoInfo.type"></recommendVideo>
      </div>
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import vPlayer from './vPlayer'
import comment from './comment'
import playerInfo from './playerInfo'
import barrageList from './barrageList'
import recommendVideo from './recommendVideo'
export default {
  name: 'Playpage',
  components: {
    navMenu,
    vPlayer,
    comment,
    playerInfo,
    barrageList,
    recommendVideo
  },
  data () {
    return {
      vID: '',
      videoInfo: {}
    }
  },
  created () {
    this.stopSpaceKeyDefault()
    this.getVideoID()
  },
  methods: {
    onFollowClick () {
      this.follow = !this.follow
    },
    // 获取视频ID
    getVideoID () {
      this.vID = this.$route.params.vID
      if (this.vID) {
        this.setVideoInfo(this.vID)
      }
    },
    // 视频信息连接
    setVideoInfo (id) {
      this.$API.use('video/getVideoUrl', {vID: id}, this.getVideoInfo)
    },
    // 获取视频信息
    getVideoInfo (res) {
      this.videoInfo = res.data[0] // 视频信息存储
      this.videoInfo.time = this.$moment(this.videoInfo.time).format('YYYY-MM-DD')
    },
    // 点击类型
    onTypeClick (type) {
      this.$router.push({path: '/typepage', query: {type: type}})
    },
    // 视频播放时阻止默认事件
    stopSpaceKeyDefault () {
      document.onkeydown = function (ev) {
        var e = ev || event
        if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40) { // 阻止空格键，上下键
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Playpage {
  min-width: 1400px;
}
.navMenu {
  box-shadow: 0 1px 3px #888888;
}
.page-content {
  margin: 60px 15%;
  width: 70%;
  // min-width: 1200px;
  display: flex;
  .content-left {
    width: calc(100% - 320px);
    .video-info {
      width: 100%;
      & > h2 {
        height: 30px;
        line-height: 30px;
        overflow: hidden;
      }
      .type-time {
        height: 40px;
        line-height: 40px;
        & > span:first-child {
          &:hover {
            cursor: pointer;
            color:  #00a1d6;
          }
        }
        & > span:last-child {
          font-style: italic;
        }
      }
    }
  }
  .content-right {
    width: 320px;
    margin-left: 25px;
  }
}
</style>
