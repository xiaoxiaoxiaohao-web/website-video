<template>
  <div class="pageCard">
    <h2>
      <slot name="title" />
    </h2>
    <div class="page-video">
      <div class="video-details" v-for="(val, i) in videoData" :key="i">
         <imgMask :vID="val.vID">
          <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="代表作" slot="img" @click="onVideoPlayerClick(val.vID)" />
        </imgMask>
        <h4 @click="onVideoPlayerClick(val.vID)">{{val.title}}</h4>
        <p><a-icon type="play-circle" />&nbsp;&nbsp;{{val.broadcast}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon-dynamic_ds" />&nbsp;&nbsp;{{val.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import imgMask from '@/components/Public/imgMask'
export default {
  name: 'pageCard',
  props: ['ID'],
  components: {
    imgMask
  },
  data () {
    return {
      videoData: []
    }
  },
  watch: {
    ID: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.setVideoData(newVal)
        }
      }
    }
  },
  methods: {
    setVideoData (ID) {
      this.$API.use('video/userVideo', {ID: ID}, this.getVideoData)
    },
    getVideoData (res) {
      res.data.forEach(element => {
        element.time = this.$moment(element.time).format('YYYY-MM-DD')
        this.videoData.push(element)
      })
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  .btn-group {
    float: right;
  }
}
.page-video {
  display: flex;
  flex-wrap: wrap;
  .video-details {
    margin: 10px 20px;
    width: 180px;
    img {
      width: 180px;
      height: 100px;
      border-radius: 3px;
    }
    h4 {
      height: 40px;
      overflow: hidden;
      &:hover {
        cursor: pointer;
        color: #00a1d6;
      }
    }
    p {
      font-size: 12px;
    }
  }
  // .video-details:nth-child(5n) {
  //   margin-right: 0;
  // }
}
</style>
