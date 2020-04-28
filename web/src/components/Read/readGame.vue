<template>
  <div class="readGame">
    <readTabs :tabs="tabsData"></readTabs>
  </div>
</template>

<script>
import readTabs from './readTabs'
export default {
  name: 'readGame',
  components: {
    readTabs
  },
  data () {
    return {
      tabsData: [
        {tab: '全部', content: '111'},
        {tab: '单机游戏', content: '222'},
        {tab: '电子竞技', content: '333'},
        {tab: '手机游戏', content: '444'},
        {tab: '网络游戏', content: '5555'},
        {tab: '桌游棋牌', content: '5555'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
