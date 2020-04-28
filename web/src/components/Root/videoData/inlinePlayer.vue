<template>
  <div class="inlinePlayer" >
      <div class="video-content">
      <div>
        <span>视频ID(vID)：</span>
        <span>{{videoInfo.vID}}</span>
      </div>
      <div>
        <span>视频简介：</span>
        <span>{{videoInfo.synopsis}}</span>
      </div>
    </div>
    <div ref="inlineVideo"></div>
  </div>
</template>

<script>
import Player from 'xgplayer'
export default {
  name: 'inlinePlayer',
  props: ['videoInfo'],
  data () {
    return {
      videoSrc: '',
      videoUrl: '', // 视频链接
      videoPoster: '', // 视频封面图
      info: {}, // 视频信息
      player: ''
    }
  },
  mounted () {
    this.getVideoPlayerInfo(this.videoInfo)
  },
  methods: {
    // 获取视频信息
    getVideoPlayerInfo (info) {
      this.videoUrl = 'http://localhost:3001/video/' + info.address + '.mp4'
      this.videoPoster = 'http://localhost:3001/images/' + info.src + '.jpg'
      this.createVideoPlayer(this.videoUrl, this.videoPostera)
    },
    // 视频播放器构造
    createVideoPlayer (url, poster) {
      this.player = new Player({
        el: this.$refs.inlineVideo,
        url: url,
        width: '100%',
        height: 400,
        poster: poster, // 封面图
        playbackRate: [1, 1.5, 2],
        keyShortcut: 'on' // 键盘快捷键,按 → 键快进10秒， 按 ← 键后退10秒，按 ↑ 键调高音量，按 ↓ 键调低音量，按 space 键切换播放/暂停状态。
      })
    }
  }
}
</script>

<style lang="less" scoped>
.inlinePlayer {
  width: 100%;
  margin-top: 20px;
  .video-content {
    margin: 20px 0;
    & > div {
      & > span:first-child {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
</style>
