<template>
  <div class="Typepage">
    <div class="page-header">
      <navMenu></navMenu>
      <div class="header">
        <img src="@/assets/timg.jpg" alt="海报图">
      </div>
    </div>
    <div class="page-conent">
      <div class="type-card" v-for="(item) in labelData" :key="item.label">
        <div class="card-header">
          <!-- <i class="icon-column_zb" /> -->
          <div class="label-title">
            <p>{{item.label}}</p>
            <!-- <div class="btn-group">
              <a-button size="small" @click="onExchangeClick(index)"><a-icon type="sync" />换一换</a-button>
            </div> -->
          </div>
        </div>
        <div class="card-content">
          <contentCard :item="item"></contentCard>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import contentCard from './contentCard'
import Footer from '@/components/Public/Footer'
export default {
  name: 'Typepage',
  components: {
    navMenu,
    contentCard,
    Footer
  },
  data () {
    return {
      labelData: [],
      num: 0
    }
  },
  created () {
    this.getTypeLabel(this.$route.query.type)
  },
  methods: {
    // 根据类型查询
    getTypeLabel (type) {
      this.$API.use('video/getVideoLabel', {type: type}, this.getVideoLabel)
    },
    // 获取不同的标签
    getVideoLabel (res) {
      res.data.forEach(element => {
        this.labelData.push(element)
      })
    }
    // // 换一换按钮
    // onExchangeClick (index) {
    //   this.num = index
    //   // this.labelVideoData()
    // }
    // // 标签视频连接
    // labelVideoData (label) {
    //   // let start = 0
    //   this.$API.use('video/getLabelVideoData', {label: label}, this.getLabelVideoData)
    // },
    // // 获取标签视频数据
    // getLabelVideoData (res) {
    //   this.newItemData = res.data
    // }
  }
}
</script>

<style lang="less" scoped>
.typePage {
  width: 100%;
  height: 100%;
}
.navMenu {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}
.header img {
  width: 100%;
  height: 200px;
  min-width: 1400px;
}
.page-conent {
  // width: 70%;
  width: 80%;
  margin: 50px 10%;
  min-width: 1200px;
}
.type-card {
  width: 100%;
  margin-bottom: 10px;
  .card-header {
    height: 50px;
    width: 100%;
    // i {
    //   font-size: 30px;
    // }
    .label-title {
      margin:0 8px;
      font-size: 22px;
      height: 30px;
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
}
// .card-content {
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;

// }
</style>
