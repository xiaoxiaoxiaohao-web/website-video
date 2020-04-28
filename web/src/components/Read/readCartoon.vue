<template>
  <div class="readCartoon">
    <readTabs :tabs="tabsData"></readTabs>
  </div>
</template>

<script>
import readTabs from './readTabs'
export default {
  name: 'readCartoon',
  components: {
    readTabs
  },
  data () {
    return {
      tabsData: [
        {tab: '全部', content: '111'},
        {tab: '动漫杂谈', content: '222'},
        {tab: '动漫资讯', content: '333'},
        {tab: '动漫技术', content: '444'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
