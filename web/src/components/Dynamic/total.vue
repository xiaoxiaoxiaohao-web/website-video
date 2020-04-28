<template>
  <div class="total">
    <div class="total-header">
      <img src="@/assets/timg.jpg" alt="头像">
      <div class="header-title">
        <h4>幻想乐园综艺字幕组</h4>
        <p>20分钟前</p>
      </div>
    </div>
    <div class="total-content">
      <h4>拜托了猫咪</h4>
      <div class="content-info" @mouseenter="onVideoEnter" @mouseleave="onVideoLeave">
        <video src="https://www.w3school.com.cn/i/movie.ogg" ref="video" >你的浏览器不支持该视频</video>
        <div class="info">
          <h4>拜托了猫咪</h4>
          <p>链接</p>
          <a-icon type="play-circle" />
        </div>
      </div>
    </div>
    <div class="total-footer">
      <div class="icon" v-for="(v, i) in iconData" :key="i" @click="onIconClick(i)">
        <a-icon :type="v.type" :style="{fontSize: '18px'}" />
        <span>2</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'total',
  data () {
    return {
      iconData: [
        {type: 'share-alt'},
        {type: 'message'},
        {type: 'like'}
      ]
    }
  },
  methods: {
    // 鼠标移进
    onVideoEnter () {
      this.$refs.video.setAttribute('controls', 'controls')
    },
    // 鼠标移出
    onVideoLeave () {
      this.$refs.video.removeAttribute('controls')
    },
    onIconClick (e) {
      if (e === 2) { // 点赞按钮
        this.$message.success('点赞成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total-header  {
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .header-title {
    height: 50px;
    margin: 5px 10px;
  }
}
.total-content {
  margin-left: 60px;
  cursor: pointer;
  .content-info {
    margin: 10px 0;
    height: 150px;
    border: 1px solid #e5e9ef;
    border-radius: 2px;
    display: flex;
    & > video {
      width: 210px;
      height: 100%;
    }
    .info {
      margin: 10px 20px;

      & > p {
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
.total-footer {
  display: flex;
  margin-left: 60px;
  .icon {
    margin-right: 80px;
    &:hover {
      cursor: pointer;
      color: #FB7299;
    }
  }
}
</style>
