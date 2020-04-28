<template>
  <div class="readInterest">
    <readTabs :tabs="tabsData"></readTabs>
  </div>
</template>

<script>
import readTabs from './readTabs'
export default {
  name: 'readInterest',
  components: {
    readTabs
  },
  data () {
    return {
      tabsData: [
        {tab: '全部', content: '111'},
        {tab: '绘画', content: '222'},
        {tab: '手工', content: '333'},
        {tab: '摄影', content: '444'},
        {tab: '音乐舞蹈', content: '5555'},
        {tab: '模型手办', content: '666'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
