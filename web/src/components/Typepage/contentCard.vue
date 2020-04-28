<template>
  <div class="contentCard">
    <div class="mould" v-for="(val, i) in itemData" :key="i" v-if="i < 10" @click="onVideoPlayerClick(val.vID)">
      <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" :alt="val.title">
      <h3>{{val.title}}</h3>
      <div class="authorInfo">
        <span>{{val.synopsis}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contentCard',
  props: {
    item: {

    }
    // exchange: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      itemData: []
    }
  },
  created () {
    this.labelVideoData()
  },
  watch: {
    // exchange: {
    //   immediate: true,
    //   handler (newVal) {
    //     this.labelVideoData()
    //   }
    // }
  },
  methods: {
    // 标签视频连接
    labelVideoData () {
      this.$API.use('video/getLabelVideoData', {label: this.item.label}, this.getLabelVideoData)
    },
    // 获取标签视频数据
    getLabelVideoData (res) {
      this.itemData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.contentCard {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .mould {
    width: calc(100% / 5 - 10px);
    margin:0 10px 0px 0;
    img {
      width: 100%;
      height: 120px;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
      }
    }
    h3 {
      width: 100%;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      color: #00a1d6;
      font-weight: 600;
        &:hover {
        cursor: pointer;
      }
    }
    .authorInfo {
      width: 100%;
      height: 40px;
      overflow: hidden;
      font-size: 13px;
    }
  }
}
</style>
