<template>
  <div class="examineCard">
    <div class="video-img">
      <img :src="imgSrc" alt="缩略图">
    </div>
    <div class="video-info">
      <h2 @click="onTitleClick(item)">{{item.title}}</h2>
      <p>{{item.time}}</p>
      <p>
        <span @click="onTypeClick(item.type)">{{item.type}} >>> {{item.label}}</span>&nbsp;&nbsp;&nbsp;
        <span style="color: red;">{{item.reason}}</span>
      </p>
    </div>
    <div class="btn-group">
      <slot name="button"></slot>
      <a-button @click="onDeleteClick">删除</a-button>
      <a-modal title="提示信息" v-model="visible" @ok="handleOk(item.vID, item.src)" okText="确认" cancelText="取消">
        <p>你确定删除？(删除后不可恢复)</p>
      </a-modal>
      <slot name="modal"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examineCard',
  props: ['item'],
  data () {
    return {
      visible: false,
      imgSrc: ''
    }
  },
  created () {

  },
  watch: {
    item: {
      immediate: true,
      handler (newVal) {
        this.timeStyleChange(newVal.time)
      }
    }
  },
  methods: {
    // 时间样式转换
    timeStyleChange (time) {
      this.imgSrc = 'http://localhost:3001/images/' + this.item.src + '.jpg'
      this.item.time = this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 删除按钮
    onDeleteClick () {
      this.visible = true
    },
    // 确实删除事件
    handleOk (vID, src) {
      this.visible = false
      this.$API.use('video/deleteVideo', {name: this.item.address, src: src, vID: vID}, this.deleteVideo)
    },
    // 删除视频按钮
    deleteVideo (res) {
      if (res.state === '1') {
        this.$message.success('删除成功')
        this.$emit('refreshShowData')
      } else {
        this.$message.error('删除失败')
      }
    },
    onTitleClick (val) {
      if (val.state === '进行中') {
        this.$message.error('请等待审核')
      } else {
        this.onVideoPlayerClick(val.vID)
      }
    },
    // 前往类型
    onTypeClick (type) {
      let routerUrl = this.$router.resolve({ path: '/typepage', query: {type: type} })
      window.open(routerUrl.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.examineCard {
  // position: relative;
  width: 100%;
  min-height: 140px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e5e9ef;
  display: flex;
  .video-img {
    width: 160px;
    height: 100px;
    cursor: pointer;
    & >img {
      width: 160px;
      height: 100px;
      border-radius: 4px;
    }
  }
  .video-info {
    margin-left: 20px;
    & > h2 {
      width: 500px;
      height: 30px;
      line-height: 30px;
      color: #00a1d6;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        cursor: pointer;
      }
    }
    & > p {
      height: 15px;
      margin-top: 10px;
      & > span:hover {
        color: #00a1d6;
        cursor: pointer;
      }
    }
  }
  .btn-group {
    margin-left: auto;
    height: 100px;
    line-height: 100px;
    & > .ant-btn {
      margin-right: 20px;
    }
  }
}
</style>
