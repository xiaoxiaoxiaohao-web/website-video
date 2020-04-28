<template>
  <div class="infoHomepage">
    <div class="page-left">
      <div class="home-header">
        <h2>代表作</h2>
        <div class="representative-work">
          <div v-for="(val, index) in workData" :key="index" class="works">
            <div class="works-num">
              <h1>{{index + 1}}</h1>
            </div>
            <div class="detail-work">
              <imgMask :vID="val.vID">
                <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="代表作" slot="img" />
              </imgMask>
              <div class="video-info">
                <h4  @click="onVideoPlayerClick(val.vID)">{{val.title}}</h4>
                <p>
                  <span title="播放量" ><a-icon type="play-square" />&nbsp;&nbsp;{{val.broadcast}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span title="留言量"><a-icon type="message" />&nbsp;&nbsp;{{val.message}}</span>
                </p>
              </div>
            </div>
            <div class="connect-work" v-if="index < 2">
              <a-icon type="forward" class="icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="home-content">
        <pageCard :ID="ID">
          <template slot="title">TA的视频</template>
        </pageCard>
      </div>
    </div>
  </div>
</template>

<script>
import imgMask from '@/components/Public/imgMask'
import pageCard from './pageCard'
export default {
  name: 'infoHomepage',
  props: ['ID'],
  components: {
    imgMask,
    pageCard
  },
  data () {
    return {
      videoData: [],
      workData: []
    }
  },
  created () {
  },
  watch: {
    ID: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.setWorksData(newVal)
        }
      }
    }
  },
  methods: {
    setWorksData (ID) {
      this.$API.use('list/frontList', {ID: ID}, this.getWorksData)
    },
    // 获取代表作
    getWorksData (res) {
      this.workData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.infoHomepage {
  width: 100%;
  display: flex;
}
.page-left {
  width: 100%;
  background-color: white;
}
.home-header {
  margin: 0 20px;
  height: 290px;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  .representative-work {
    display: flex;
    // overflow-x: scroll;
    .works {
      display: flex;
      padding-top: 10px;
      // width: calc(100% / 3 );
      .works-num {
        width: 70px;
        height: 200px;
        line-height: 200px;
        font-size: 30px;
        // text-align: center;
        background-image: -webkit-linear-gradient(bottom, red , yellow);
        // -webkit-background-clip: text;
        .pre(background-clip,text);
        -webkit-text-fill-color: transparent;
      }
      img {
        width: 280px;
        height: 180px;
        border-radius: 5px;
      }
      .video-info {
        width: 280px;
        & > h4 {
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: keep-all;
          &:hover {
            cursor: pointer;
            color: #00a1d6;
          }
        }
      }
      .connect-work {
        width: 120px;
        height: 200px;
        line-height: 200px;
        font-size: 40px;
        text-align: center;
      }
    }
  }
}
.home-content {
  margin: 0 20px;
  padding: 10px 0;

}
.pre(@style, @value){
  -webkit-@{style}: @value;
      -moz-@{style}: @value;
      -ms-@{style}: @value;
          @{style}: @value;
}
// .page-right {
//   width: 460px;
//   margin-left: 20px;

//   & > div {
//     background-color: white;
//     margin-bottom: 10px;
//     padding: 0 20px;
//     & > h3 {
//       height: 50px;
//       line-height: 50px;
//       border-bottom: 1px solid #eee;
//       font-weight: 600;
//     }
//     & > p {
//       height: 30px;
//       line-height: 30px;
//     }
//   }
//   .live-room {
//     & > p {
//       text-align: center;
//       margin: 0;
//     }
//     & > p:last-child {
//       color: #00a1d6;
//       cursor: pointer;
//     }
//   }
// }
.ant-btn-group {
  float: right;
}
</style>
