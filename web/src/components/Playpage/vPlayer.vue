<template>
  <div class="vPlayer" >
    <div ref="videoMessage"></div>
    <div class="send-danmu" slot="sendDanmu">
      <a-input placeholder="弹幕内容" v-model="danmuTxt" />
      <a-button type="primary" @click="onSendDanmuClick">发送</a-button>
    </div>
  </div>
</template>

<script>
import Player from 'xgplayer'
export default {
  name: 'vPlayer',
  props: ['videoInfo'],
  data () {
    return {
      videoSrc: '',
      videoUrl: '', // 视频链接
      videoPoster: '', // 视频封面图
      danmuData: [],
      info: {}, // 视频信息
      danmuTxt: '', // 弹幕内容
      player: ''
    }
  },
  watch: {
    videoInfo: {
      immediate: true,
      handler (newVal) {
        if (Object.keys(newVal).length !== 0) {
          this.info = newVal
          this.setDanmuList(this.info.vID)
        }
      }
    }
  },
  methods: {
    // 获取视频信息
    getVideoPlayerInfo (info) {
      this.videoUrl = 'http://localhost:3001/video/' + info.address + '.mp4'
      this.videoPoster = 'http://localhost:3001/images/' + info.src + '.jpg'
      this.createVideoPlayer(this.videoUrl, this.videoPoster, this.danmuData)
    },
    // 视频播放器构造
    createVideoPlayer (url, poster, comments) {
      this.player = new Player({
        el: this.$refs.videoMessage,
        url: url,
        width: '100%',
        height: 400,
        poster: poster, // 封面图
        playbackRate: [0.5, 1, 1.5],
        download: true, // 设置download控件显示
        keyShortcut: 'on', // 键盘快捷键,按 → 键快进10秒， 按 ← 键后退10秒，按 ↑ 键调高音量，按 ↓ 键调低音量，按 space 键切换播放/暂停状态。
        danmu: {
          comments: comments, // 弹幕数组
          area: { // 弹幕显示区域
            start: 0, // 区域顶部到播放器顶部所占播放器高度的比例
            end: 1 // 区域底部到播放器顶部所占播放器高度的比例
          },
          closeDefaultBtn: false, // 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
          defaultOff: false, // 开启此项后弹幕不会初始化，默认初始化弹幕
          live: true
        }
      })
      this.player.emit('resourceReady', [
        { name: '标清', url: url },
        { name: '高清', url: url }
      ])
    },
    setDanmuList (id) {
      this.$API.use('list/danmuList', {vID: id}, this.getDamuListData)
    },
    // 获取弹幕数据(进行弹幕数据的样式处理)
    getDamuListData (res) {
      this.danmuData = res.data
      this.danmuData.forEach(element => { // 构建弹幕样式
        element.id = element.id + ''
        element.time = this.$moment(element.time).format('MM-DD HH:mm')
        element.duration = 15000
        element.style = {
          color: '#ff9500',
          fontSize: '15px'
        }
        element.start = parseInt(element.start)
      })
      this.getVideoPlayerInfo(this.info)
    },
    // 发送弹幕
    onSendDanmuClick () {
      // 获取弹幕内容
      let txt = this.danmuTxt
      if (txt !== '') { // 弹幕不为空的情况
        // 获取当前视频时间点
        let start = this.player.currentTime * 1000 // 毫秒
        // 获取用户ID
        let uID = this.$cookies.get('ID') || window.localStorage.getItem('ID')
        // 构建新弹幕
        let newDanmu = {
          vID: this.info.vID,
          start: start,
          txt: txt,
          sendtime: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
          uID: uID
        }
        let addDanmu = {
          ...newDanmu,
          id: 'id',
          duration: 15000,
          style: {
            color: '#ff9500',
            fontSize: '15px',
            border: 'solid 1px #ff9500',
            borderRadius: '30px'
          }
        }
        // 实时发送弹幕
        this.player.danmu.sendComment(addDanmu)
        // 新弹幕存入数据库
        this.$API.use('list/addDanmuList', newDanmu, this.addDamuListData)
      } else {
        this.$message.error('弹幕内容为空')
      }
    },
    addDamuListData (res) {
      if (res.state === '1') {
        this.$message.success('弹幕发送成功')
        this.danmuTxt = ''
        // 视频增加弹幕量
        this.$API.use('video/updateVideoNum', {name: 'barrage', vID: this.$route.params.vID})
      } else {
        this.$message.error('弹幕发送失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.vPlayer {
  width: 100%;
  margin-top: 20px;
    .send-danmu {
      margin-top: 20px;
      .ant-input {
        width: 85%;
      }
      .ant-btn-primary {
        width: 10%;
      }
  }
}
// .video-content {
//   width: 100%;
//   border: 10px solid black;
// }
</style>
