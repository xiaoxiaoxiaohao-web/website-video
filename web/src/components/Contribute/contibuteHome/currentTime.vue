<template>
  <div class="currentTime">
    <div class="time-left" @click="onCurrentTimeClick">
      <a-button type="primary" size="small" ghost>日历</a-button>
      <div class="account-time">
        · 今天是你在视频网站的第999天
      </div>
    </div>
    <div class="time-right" @click="onCurrentTimeClick">
      <div class="more">
        <span>更多</span><a-icon type="right" />
      </div>
      <div class="now-time">
        2020-02-08
      </div>
    </div>
    <timeDrawer :showDrawer="showDrawer" @closeDrawer="closeDrawer" ></timeDrawer>
  </div>
</template>

<script>
import timeDrawer from './timeDrawer'
export default {
  name: 'currentTime',
  components: {
    timeDrawer
  },
  data () {
    return {
      showDrawer: false
    }
  },
  methods: {
    // 获取日历
    onCurrentTimeClick () {
      this.showDrawer = true
    },
    // 关闭日历
    closeDrawer (data) {
      this.showDrawer = data
    }
  }
}
</script>

<style lang="less" scoped>
.currentTime {
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  padding: 0 30px;
  .time-left {
    width: 50%;
    line-height: 50px;
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }
  .time-right {
    display: flex;
    flex-direction: row-reverse;
    width: 50%;
    line-height: 50px;
    &:hover {
      cursor: pointer;
    }
    .now-time {
      margin-right: 15px;
    }
  }
}
.ant-btn {
  color: #fa8e57;
  border-color: #fa8e57;
  margin: 12px 20px 0 0;
  &:hover, &:focus {
    color: #fa8e57;
    border-color: #fa8e57;
  }
}
</style>
