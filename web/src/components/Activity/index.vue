<template>
  <div class="Activity">
    <navMenu></navMenu>
    <div class="bg-img">
      <img src="@/assets/timg.jpg" alt="顶部背景图">
    </div>
    <div class="act-list">
      <h3>活动列表</h3>
      <actCard v-for="(item, index) in actListData" :key="index" :item="item"></actCard>
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import actCard from './actCard'
export default {
  name: 'Activity',
  components: {
    navMenu,
    actCard
  },
  data () {
    return {
      // 活动列表数据
      // actListData: [
      //   {src: '1.jpg', title: '2019年度娱乐大赏', startTime: '2019-12-19', endTime: '2020-01-17', info: '参与2019哔哩哔哩年度娱乐大赏，亲自选出你心中艺能、舞台、演技、颜值四大领域的人气TOP1！'},
      //   {src: '2.jpg', title: '干杯计划', startTime: '2020-01-02', endTime: '2020-02-06', info: ''},
      //   {src: '3.jpg', title: 'NEWS FOR UP-12月刊', startTime: '0000-00-00', endTime: '0000-00-00', info: ''},
      //   {src: '4.jpg', title: '1月打卡挑战', startTime: '2020-01-01', endTime: '2020-01-16', info: '1月1日-1月16日，打卡瓜分20万，集赞得大会员~！'},
      //   {src: '5.jpg', title: '我的职业故事-分享有奖', startTime: '2019-12-30', endTime: '2023-02-10', info: '分享职业故事、职场vlog、求职经验等，赢千元奖金！'}
      // ],
      actListData: []
    }
  },
  created () {
    this.setActListData()
  },
  methods: {
    // 活动链接
    setActListData () {
      this.$API.use('list/actList', {}, this.getActListData)
    },
    // 获取活动列表
    getActListData (res) {
      if (res.state === '1') {
        this.actListData = res.data
      } else {
        this.$message.error('获取活动列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Activity {
  width: 100%;
}
.navMenu {
  background: rgba(255, 255, 255, 0.6) !important;
  color: black !important;
}
.bg-img {
  width: 100%;
  height: 170px;
  img {
    width: 100%;
    height: 100%;
  }
}
.act-list {
  width: 1200px;
  margin: 0 auto;
  & > h3 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e9ef;
  }

}
</style>
