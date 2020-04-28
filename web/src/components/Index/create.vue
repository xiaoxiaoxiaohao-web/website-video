<template>
  <div class="create">
    <div class="create-header">
      <i class="icon-column_gc" />
      <div class="info">
        <p>国创</p>
        <timeTable></timeTable>
      </div>
    </div>
  </div>
</template>

<script>
import timeTable from '@/components/Public/timeTable'
export default {
  name: 'create',
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
.create {
  height: 400px;
}
.create-header {
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
