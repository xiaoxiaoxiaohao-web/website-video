<template>
  <div class="popularize">
    <div class="popularize-header">
      <i class="icon-column_tg" />
      <div class="info">
        <p>推广</p>
        <div class="btn-group">
          <a-button size="small" @click="onExchangeClick"><a-icon type="sync" />换一换</a-button>
        </div>
      </div>
    </div>
    <div class="popularize-content">
      <div class="mould" v-for="(val, i) in columnData" :key="i" >
        <imgMask :vID="val.vID">
          <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="影视推广视频" slot="img" >
        </imgMask>
        <h4>{{val.title}}</h4>
        <div class="authorInfo">
          <a-tag>UP</a-tag>
          <span @click="onAuthorClick(val.username)">{{val.username}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgMask from '@/components/Public/imgMask'
export default {
  name: 'popularize',
  components: {
    imgMask
  },
  data () {
    return {
      columnData: [],
      showMask: false,
      current: 0
    }
  },
  created () {
    this.setPopularizeData(5)
  },
  methods: {
    // 接口连接
    setPopularizeData (num) {
      this.$API.use('video/getPopularizeData', {num: num}, this.getPopularizeData)
    },
    // 获取推广数据
    getPopularizeData (res) {
      this.columnData = res.data
    },
    // 作者空间
    onAuthorClick (username) {
      let routerUrl = this.$router.resolve({ path: '/information', query: { maker: username } })
      window.open(routerUrl.href, '_blank')
    },
    // 换一换
    onExchangeClick () {
      this.setPopularizeData(5)
    }
  }
}
</script>

<style lang="less" scoped>
.popularize-header {
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  i {
    font-size: 30px;
  }
  p {
    margin-left: 8px;
    font-size: 22px;
    height: 30px;
    line-height: 30px;
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
.popularize-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .mould {
    width: calc(100% / 5 - 10px);
    margin-right: 10px;
    img {
      width: 100%;
      height: 120px;
      border-radius: 3px;
      cursor: pointer;
    }
    & > h4 {
      width: 100%;
      height: 45px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        font-weight: 600;
        color: #00a1d6;
      }
    }
    .authorInfo {
      height: 20px;
      line-height: 20px;
      &:hover {
        color: #00a1d6;
      }
      .ant-tag {
        width: 16px;
        height: 16px;
        line-height: 14px;
        font-size: 10px;
        padding: 0;
      }
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
