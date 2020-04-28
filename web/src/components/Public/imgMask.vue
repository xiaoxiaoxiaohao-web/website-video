<template>
  <div class="imgMask" @mouseenter="onImgMouserEnter(index)" @mouseleave="onImgMouseLeave" @click="onVideoPlayerClick(vID)" >
    <div @click="onVideoPlayerClick(vID)">
      <slot name="img"></slot>
    </div>
    <div class="mask" v-if="showMask && current === index">
      <a-icon type="play-circle" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgMask',
  props: ['index', 'vID'],
  data () {
    return {
      showMask: false,
      current: 0
    }
  },
  methods: {
    // 蒙层效果显示
    onImgMouserEnter (i) {
      this.showMask = true
      this.current = i
    },
    // 蒙层效果隐藏
    onImgMouseLeave () {
      this.showMask = false
      this.current = ''
    }
  }
}
</script>

<style lang="less" scoped>
.imgMask {
  position: relative;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    vertical-align: middle;
    cursor: pointer;
    text-align: center;
    & > .icon {
      position: relative;
      color:white;
      font-size: 30px;
      top: calc(50% - 15px);
    }
  }
}
</style>
