<template>
  <div class="timeDrawer">
    <a-drawer
      title="今天是你在视频网站的第999天"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="328px"
    >
      <div :style="{ width: '100%'}">
        <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
      </div>
      <!-- <div class="hot-events">
        <h2><a-icon type="fire" :style="{ color: '#fa8e57' }" theme="filled" /> 热点事件</h2>
        <p>这是一个热门事件</p>
      </div> -->
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: 'timeDrawer',
  props: ['showDrawer'],
  data () {
    return {
      visible: false
    }
  },
  watch: {
    showDrawer: {
      immediate: true,
      handler (newVal) {
        this.visible = newVal
      }
    }
  },
  methods: {
    onClose () {
      this.visible = false
      this.$emit('closeDrawer', this.visible)
    },
    onPanelChange () {

    }
  }
}
</script>

<style lang="less" scoped>
.hot-events {
  & > h2 {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e7e7e7;
    padding: 0 24px;
  }
  & > p {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e7e7e7;
    padding: 0 24px;
  }
}
</style>
