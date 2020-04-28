<template>
  <div class="Topic">
    <navMenu></navMenu>
    <div class="bg-img">
      <img src="@/assets/timg.jpg" alt="顶部背景图">
    </div>
    <div class="topic-list">
      <h3>专题列表</h3>
      <div class="topic-menu">
        <ul>
          <li v-for="(val, i) in topicMenuData" :key="i" @click="onTopicMenuClick(i)" ref="li">{{val}}</li>
        </ul>
      </div>
      <topicCard v-for="(item, index) in topicListData" :key="index" :item="item"></topicCard>
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import topicCard from './topicCard'
export default {
  name: 'Topic',
  components: {
    navMenu,
    topicCard
  },
  data () {
    return {
      // topicMenuData: ['全部', '动画', '音乐', '游戏', '娱乐', '番剧', '影视', '科技'],
      topicListData: [
        {src: '1.jpg', title: '2019年度娱乐大赏', exactTime: '2019-12-19 14:03:31', info: '参与2019哔哩哔哩年度娱乐大赏，亲自选出你心中艺能、舞台、演技、颜值四大领域的人气TOP1！'},
        {src: '2.jpg', title: '干杯计划', exactTime: '2020-01-02 14:03:31', info: ''},
        {src: '3.jpg', title: 'NEWS FOR UP-12月刊', exactTime: '0000-00-00', info: ''},
        {src: '4.jpg', title: '1月打卡挑战', exactTime: '2020-01-01 14:03:31', info: '1月1日-1月16日，打卡瓜分20万，集赞得大会员~！'},
        {src: '5.jpg', title: '我的职业故事-分享有奖', exactTime: '2019-12-30 14:03:31', info: '分享职业故事、职场vlog、求职经验等，赢千元奖金！'}
      ]
    }
  },
  methods: {
    onTopicMenuClick (index) {
      // 增加参数
      this.$router.push({name: 'Topic', query: {type: index}})
      // 点击选中时保持选中状态
      this.$refs.li.forEach((element, n) => {
        console.log(element)
        if (index === n) {
          this.$refs.li[n].setAttribute('style', 'color:#00a1d6')
        } else {
          this.$refs.li[n].removeAttribute('style')
        }
      })
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
.topic-list {
  width: 1200px;
  margin: 0 auto;
  & > h3 {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .topic-menu {
    ul {
      display: flex;
      border-bottom: 1px solid #e5e9ef;
      li {
        width: 50px;
        height: 40px;
        line-height: 40px;
        list-style-type: none;

        &:hover {
          color: #00a1d6;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
