<template>
  <div class="dataCard">
    <p>{{title}} <a-icon type="right" style="fontSize: 10px;" /></p>
    <h1>{{num}}</h1>
  </div>
</template>

<script>
export default {
  name: 'dataCard',
  props: ['title'],
  data () {
    return {
      num: 0
    }
  },
  watch: {
    title: {
      immediate: true,
      handler (newVal) {
        this.judgeAttributeSum(newVal)
      }
    }
  },
  methods: {
    // 判断请求的类型总和
    judgeAttributeSum (val) {
      let att
      switch (val) {
        case '视频播放':
          att = 'broadcast'
          break
        case '评论数':
          att = 'message'
          break
        case '弹幕数':
          att = 'barrage'
          break
        default:
          break
      }
      this.setNumSum(att)
    },
    // 接口
    setNumSum (attribute) {
      let ID = this.$route.query.ID
      this.$API.use('sum/getNumSum', {attribute: attribute, ID: ID}, this.getNumSum)
    },
    // 获得总和数据
    getNumSum (res) {
      if (res.state === '1') {
        if (res.data[0].sum !== null) {
          this.num = res.data[0].sum
        } else {
          this.num = 0
        }
      } else {
        console.log('请求总和数据出错', res.err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dataCard {
  width: calc(100% / 3 - 30px);
  height: 110px;
  background: rgba(0,161,214,.03);
  padding: 10px 30px;
  margin: 10px 15px 0 15px;
  &:hover {
    cursor: pointer;
  }
  & > h1 {
    color: #00a1d6;
  }
}
</style>
