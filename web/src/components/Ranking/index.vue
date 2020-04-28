<template>
  <div class="Ranking">
    <div class="Ranking-header">
      <navMenu></navMenu>
      <div class="header">
        <img src="@/assets/timg.jpg" alt="海报图">
      </div>
    </div>
    <div class="Ranking-content">
      <a-tabs defaultActiveKey="1" @change="onTabsChange">
        <a-tab-pane key="1">
          <span slot="tab"><i class="icon-rank_yc" />动画榜</span>
          <rankMenu :menuData="cartoonMenuData" @setLabel="setLabel"></rankMenu>
          <rankList :label="label"></rankList>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab"><i class="icon-rank_xf" />科技榜</span>
          <rankMenu :menuData="scienceMenuData" @setLabel="setLabel"></rankMenu>
          <rankList :label="label"></rankList>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab"><i class="icon-rank_ys" />影视榜</span>
          <rankMenu :menuData="moviesMenuData" @setLabel="setLabel"></rankMenu>
          <rankList :label="label"></rankList>
        </a-tab-pane>
        <a-tab-pane key="4">
          <span slot="tab"><i class="icon-rank_xr" />生活榜</span>
          <rankMenu :menuData="lifeMenuData" @setLabel="setLabel"></rankMenu>
          <rankList :label="label"></rankList>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import rankMenu from './rankMenu'
import rankList from './rankList'
export default {
  name: 'Ranking',
  components: {
    navMenu,
    rankMenu,
    rankList
  },
  data () {
    return {
      activeKey: '3',
      allMenuData: [],
      cartoonMenuData: [],
      scienceMenuData: [],
      moviesMenuData: [],
      // menuData: [],
      lifeMenuData: [],
      label: ''
    }
  },
  created () {
    // this.judgeType()
    this.$API.use('video/getVideoLabel', {type: '动画'}, this.getCartoonLabel)
  },
  methods: {
    // judgeType () {
    //   let type = this.$route.query.type
    //   this.activeKey = type
    //   this.onTabsChange(2)
    // },
    onTabsChange (e) { // 获取不同的类型排行榜
      switch (e) {
        case '1':
          this.$API.use('video/getVideoLabel', {type: '动画'}, this.getCartoonLabel)
          break
        case '2':
          this.$API.use('video/getVideoLabel', {type: '科技'}, this.getScienceLabel)
          break
        case '3':
          this.$API.use('video/getVideoLabel', {type: '影视'}, this.getMoviesLabel)
          break
        case '4':
          this.$API.use('video/getVideoLabel', {type: '生活'}, this.getLifeLabel)
          break
        default:
          break
      }
    },
    // 获取动画排行榜数据
    getCartoonLabel (res) {
      if (res.state === '1') {
        this.cartoonMenuData = []
        res.data.forEach(element => {
          this.cartoonMenuData.push(element.label)
        })
        this.label = this.cartoonMenuData[0]
      }
    },
    // 获取科学排行榜数据
    getScienceLabel (res) {
      if (res.state === '1') {
        this.scienceMenuData = []
        res.data.forEach(element => {
          this.scienceMenuData.push(element.label)
        })
        this.label = this.scienceMenuData[0]
      }
    },
    // 获取影视排行榜数据
    getMoviesLabel (res) {
      if (res.state === '1') {
        this.moviesMenuData = []
        res.data.forEach(element => {
          this.moviesMenuData.push(element.label)
        })
        this.label = this.moviesMenuData[0]
      }
    },
    // 获取生活排行榜数据
    getLifeLabel (res) {
      if (res.state === '1') {
        this.lifeMenuData = []
        res.data.forEach(element => {
          this.lifeMenuData.push(element.label)
        })
        this.label = this.lifeMenuData[0]
      }
    },
    // 选择标签
    setLabel (res) {
      this.label = res
    }
  }
}
</script>

<style scoped>
.navMenu {
  background: rgba(255, 255, 255, 0.7) !important;
}
.header img {
  width: 100%;
  height: 220px;
  min-width: 1400px;
}
.Ranking-content {
  width: 1200px;
  margin: 0 auto;
}
.ant-tabs >>> .ant-tabs-bar {
  border: none;
}
.ant-tabs >>> .ant-tabs-nav-scroll {
  font-size: 16px;
  padding:  0 200px;
}
.ant-tabs >>> .ant-tabs-tab {
  margin: 0 34px;
}
.ant-alert-warning {
  background: #edf2f9;
}
</style>
