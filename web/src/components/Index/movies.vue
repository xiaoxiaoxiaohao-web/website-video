<template>
  <div class="movies">
    <div class="movies-header">
      <i class="icon-column_zb" />
      <div class="info">
        <p>影视</p>
        <span>233秒居然能做这些!</span>
        <div class="btn-group">
          <a-button size="small" @click="onExchangeClick"><a-icon type="sync" />换一换</a-button>
          <a-button size="small" @click="onMoreClick">更多<a-icon type="right" /></a-button>
        </div>
      </div>
    </div>
    <div class="movies-content">
      <div class="mould" v-for="(val, i) in columnData" :key="i">
        <imgMask :vID="val.vID">
          <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="影视推广视频" slot="img" >
        </imgMask>
        <div class="mouldInfo">
          <a-avatar :size="40" icon="user" v-if="val.avatar === null" />
          <img :src="'http://localhost:3001/portrait/' + val.avatar + '.jpg'" alt="头像" v-else />
          <div class="info">
            <p @click="onAuthorClick(val.username)">{{val.username}}</p>
            <h4 :title="val.title">{{val.title}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgMask from '@/components/Public/imgMask'
export default {
  name: 'movies',
  components: {
    imgMask
  },
  data () {
    return {
      columnData: [],
      imgSrc: '',
      showMask: false,
      current: ''
    }
  },
  created () {
    this.setMoviestData('影视')
  },
  methods: {
    // 接口连接
    setMoviestData (type) {
      this.$API.use('video/getTypeData', {type: type}, this.getTypeData)
    },
    // 获取数据
    getTypeData (res) {
      this.columnData = res.data
    },
    // 作者空间
    onAuthorClick (m) {
      // let username = this.$route.query.username
      let routerUrl = this.$router.resolve({path: '/information', query: {maker: m}})
      window.open(routerUrl.href, '_blank')
    },
    // 换一换
    onExchangeClick () {
      this.setMoviestData('影视')
    },
    // 更多
    onMoreClick () {
      this.$router.push({path: '/typepage', query: {type: '影视'}})
    }
  }
}
</script>

<style lang="less" scoped>
.movies-header {
  height: 50px;
  width: 100%;
  display: flex;
  i {
    font-size: 30px;
  }
  .info {
    margin:0 8px;
    font-size: 22px;
    height: 30px;
    width: 100%;
    line-height: 30px;
    display: flex;
    span {
      font-size:  12px;
      margin: 5px 20px;
    }
    i {
      font-size: 12px;
    }
    .btn-group {
      margin-left: auto;
    }
  }
}
.movies-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .mould {
    width: calc(100% / 5 - 10px);
    margin:0 10px 15px 0;
    img {
      width: 100%;
      height: 120px;
      border-radius: 3px;
      cursor: pointer;
    }
    // .img-mask {
    //   position: relative;
    //   .mask {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     background: rgba(0, 0, 0, 0.6);
    //     width: 100%;
    //     height: 120px;
    //     line-height: 120px;
    //     cursor: pointer;
    //     text-align: center;
    //     transition: height 2s;
    //     transition-timing-function: linear;
    //     // &:hover {
    //     //   height: 120px;
    //     // }
    //   }
    // }
    .mouldInfo {
      display: flex;
      margin-top: 10px;
      height: 60px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .info {
        width: calc(100% - 40px);
        height: 60px;
        padding-left: 10px;
        h4 {
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: none;
          white-space: nowrap;
        }
        p {
          font-size: 15px;
          margin: 0;
          &:hover{
            cursor: pointer;
            color: #00a1d6;
          }
        }
      }
    }
  }
}
</style>
