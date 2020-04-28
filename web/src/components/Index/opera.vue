<template>
  <div class="opera">
    <div class="opera-header">
      <i class="icon-column_fj" />
      <div class="info">
        <p>番剧</p>
        <timeTable></timeTable>
      </div>
    </div>
  </div>
</template>

<script>
import timeTable from '@/components/Public/timeTable'
export default {
  name: 'opera',
  components: {
    timeTable
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.opera {
  height: 400px;
}
.opera-header {
  height: 50px;
  width: 100%;
  display: flex;
  i {
    font-size: 30px;
  }
  .info {
    margin-left: 8px;
    font-size: 22px;
    line-height: 30px;
    display: flex;
    width: calc(100% - 38px);

    p {
      width: 10%;
    }
  }
}
</style>
