<template>
  <div class="readVideo">
    <readTabs :tabs="tabsData"></readTabs>
  </div>
</template>

<script>
import readTabs from './readTabs'
export default {
  name: 'readVideo',
  components: {
    readTabs
  },
  data () {
    return {
      tabsData: [
        {tab: '全部', content: '111'},
        {tab: '电影', content: '222'},
        {tab: '电视剧', content: '333'},
        {tab: '纪录片', content: '444'},
        {tab: '综艺', content: '5555'}
      ]
    }
  }
}
</script>
