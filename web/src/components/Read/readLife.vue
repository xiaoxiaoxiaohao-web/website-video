<template>
  <div class="readLife">
    <readTabs :tabs="tabsData"></readTabs>
  </div>
</template>

<script>
import readTabs from './readTabs'
export default {
  name: 'readLife',
  components: {
    readTabs
  },
  data () {
    return {
      tabsData: [
        {tab: '全部', content: '111'},
        {tab: '美食', content: '222'},
        {tab: '萌宠', content: '333'},
        {tab: '时尚', content: '444'},
        {tab: '运动', content: '5555'},
        {tab: '日常', content: '666'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
