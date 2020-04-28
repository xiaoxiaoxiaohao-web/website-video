<template>
  <div class="science">
    <div class="science-header">
      <i class="icon-column_dh" />
      <div class="info">
        <p>科技</p>
        <div class="btn-group">
          <a-button size="small" @click="onExchangeClick"><a-icon type="sync" />换一换</a-button>
          <a-button size="small" @click="onMoreClick">更多<a-icon type="right" /></a-button>
        </div>
      </div>
    </div>
    <div class="science-content">
      <div class="mould" v-for="(val, i) in columnData" :key="i">
        <imgMask :vID="val.vID">
          <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" alt="科技视频" slot="img">
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
  name: 'science',
  components: {
    imgMask
  },
  data () {
    return {
      columnData: []
    }
  },
  created () {
    this.setScienceData('科技')
  },
  methods: {
    // 连接接口
    setScienceData (type) {
      this.$API.use('video/getTypeData', {type: type}, this.getTypeData)
    },
    // 获取数据
    getTypeData (res) {
      this.columnData = res.data
    },
    onAuthorClick (m) {
      // let username = this.$route.query.username
      let routerUrl = this.$router.resolve({path: '/information', query: {maker: m}})
      window.open(routerUrl.href, '_blank')
    },
    // 换一换
    onExchangeClick () {
      this.setScienceData('科技')
    },
    // 更多
    onMoreClick () {
      this.$router.push({path: '/typepage', query: {type: '科技'}})
    }
  }
}
</script>

<style lang="less" scoped>
.science-header {
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
.science-content {
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
    h4 {
      width: 100%;
      height: 45px;
      overflow: hidden;
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
