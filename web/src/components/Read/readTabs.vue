<template>
  <div class="readTabs">
    <a-tabs @change="onTabsChange">
      <a-tab-pane :tab="value.tab" :key="index + 1" v-for="(value, index) in tabs">
        <readSelect :selectData="selectData"></readSelect>
        <readCard v-for="(item, index) in readCardData" :key="index" :item="item"></readCard>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import readSelect from './readSelect'
import readCard from './readCard'
export default {
  name: 'readTabs',
  props: ['tabs'],
  components: {
    readSelect,
    readCard
  },
  data () {
    return {
      selectData: [
        {value: '默认排序'},
        {value: '投稿时间排序'},
        {value: '评论数最多'},
        {value: '收藏数最多'},
        {value: '点赞数最多'}
      ],
      readCardData: [
        {title: '二次元美图推荐', introduce: 'ps:图片来自于p站 编辑加搬运：山静君 如果原作者有任何意见可', author: 'Qys8', style: '动漫杂谈', watchNum: '3', praiseNum: '5', messageNum: '12'},
        {title: '补番推荐', introduce: '点击进入查看全文', author: '妖精的尾巴ma', style: '动漫杂谈', watchNum: '3', praiseNum: '5', messageNum: '12'},
        {title: '鬼灭之刃，团结力量大，为什么九柱一直都是单打独斗，从不组队?', introduce: '鬼杀队是鬼灭之刃中的灭鬼组织，一般来说鬼杀队全员都是以个人为单位进行灭鬼，即使是刚刚通过最终别选的菜鸟队员，一般也是会获得单人任务，当初炭治郎在通过最终别选后的第一个任务就是单人完成，', author: '进击的次元酱', style: '动漫杂谈', watchNum: '3', praiseNum: '5', messageNum: '12'}
      ]
    }
  },
  methods: {
    onTabsChange (key) {
      this.$router.push({ query: { ...this.$route.query, rid: key } })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
