<template>
  <div class="readScience">
    <readTabs :tabs="tabsData"></readTabs>
  </div>
</template>

<script>
import readTabs from './readTabs'
export default {
  name: 'readScience',
  components: {
    readTabs
  },
  data () {
    return {
      tabsData: [
        {tab: '全部', content: '111'},
        {tab: '人文历史', content: '222'},
        {tab: '自然', content: '333'},
        {tab: '数码', content: '444'},
        {tab: '汽车', content: '5555'},
        {tab: '学习', content: '666'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
