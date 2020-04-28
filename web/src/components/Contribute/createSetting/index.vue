<template>
  <div class="createSetting">
    <h3>创作设置</h3>
    <settingCard>
      <h3 slot="title">原创视频添加水印设置 <span v-show="showWatermark">(未开启)</span></h3>
      <template v-slot:watermark>
        <p>原创视频稿件添加水印&nbsp;&nbsp;<a-switch @change="onWatermarkChange" /></p>
        <p>原创视频稿件添加水印 对开启后新上传的视频有效</p>
      </template>
    </settingCard>
    <settingCard>
      <h3 slot="title">播放器配置关注功能设置 <span v-show="showLabel">(未开启)</span></h3>
      <template v-slot:watermark>
        <p>播放器配置关注功能设置&nbsp;&nbsp;<a-switch @change="onFollowChange" /></p>
        <p>该关注引导只会在时长超过10s的视频且用户全屏观看情况下出现（安卓和iOS均为5.31版本以上）</p>
      </template>
    </settingCard>
    <settingCard>
      <h3 slot="title">联合投稿被邀请权限设置</h3>
      <template v-slot:watermark>
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :style="radioStyle" :value="index" v-for="(val, index) in radioData" :key="val">{{val}}</a-radio>
        </a-radio-group>
      </template>
    </settingCard>
  </div>
</template>

<script>
import settingCard from './settingCard'
export default {
  name: 'createSetting',
  components: {
    settingCard
  },
  data () {
    return {
      // 单选按钮style
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      value: 0,
      radioData: ['允许所有人邀请我', '仅允许我关注的人邀请我', '仅允许互相关注的人邀请我', '仅允许我特别关注的人邀请我', '不允许所有人邀请'],
      showWatermark: true,
      showLabel: true
    }
  },
  methods: {
    onChange (e) {
      // console.log('radio checked', e.target.value)
    },
    // 水印开关
    onWatermarkChange (checked) {
      this.showWatermark = !this.showWatermark
      if (checked === true) {
        this.$message.success('水印已开启')
      } else {
        this.$message.success('水印已关闭')
      }
    },
    // 关注开关
    onFollowChange (checked) {
      this.showLabel = !this.showLabel
      this.$message.success('播放标签设置成功')
    }
  }
}
</script>

<style lang="less" scoped>
.createSetting {
  padding: 30px 20%;
  h3 {
    & > span {
      color: #99a2aa;
    }
  }
}
</style>
