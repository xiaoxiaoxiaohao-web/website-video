<template>
  <div class="playerInfo">
    <img src="@/assets/timg.jpg" alt="头像">
    <div class="detail-info">
      <p class="name">{{videoUserInfo.username}}</p>
      <p class="desc">{{videoUserInfo.sign}}</p>
      <!-- <a-button v-if="follow" @click="onFollowClick">已关注 183万</a-button>
      <a-button type="primary" v-else @click="onFollowClick"><a-icon type="plus" />关注 183万</a-button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerInfo',
  props: ['ID'],
  data () {
    return {
      videoUserInfo: {},
      follow: false
    }
  },
  watch: {
    ID: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.setVideoUserInfo(newVal)
        }
      }
    }
  },
  methods: {
    // 视频的用户信息连接
    setVideoUserInfo (id) {
      this.$API.use('video/getUserInfo', {ID: id}, this.getVideoUserInfo)
    },
    // 获取视频拥有者的信息
    getVideoUserInfo (res) {
      this.videoUserInfo = res.data[0]
    },
    onFollowClick () {
      this.follow = !this.follow
    }
  }
}
</script>

<style lang="less" scoped>
.playerInfo {
  display: flex;
  height: 85px;
  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .detail-info {
    width: calc(100% - 40px - 20px);
    margin-left: 20px;
    & > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 14px;
      height: 14px;
      line-height: 14px;
      color: #212121;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        color:  #00a1d6;
      }
    }
    .desc {
      height: 12px;
      line-height: 12px;
      font-size: 12px;
      color: #999;
    }
  }
  .ant-btn-primary {
    padding: 0 35px;
  }
}
</style>
