<template>
  <div class="proportionRank">
    <span>动画区</span><a-progress :percent="10" status="active" />
    <span>娱乐区</span><a-progress :percent="20" status="active" />
    <span>游戏区</span><a-progress :percent="40" status="active" />
  </div>
</template>

<script>
export default {
  name: 'proportionRank',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.ant-progress {
  height: 30px;
}
</style>
