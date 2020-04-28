<template>
  <div class="Information">
    <navMenu></navMenu>
    <div class="info-header">
      <div class="my-info">
        <img :src="imgSrc" alt="头像" />
        <div class="info">
          <h1>{{infoData.username}} &nbsp;
            <a-icon type="man" :style="{color: '#1890ff'}" v-if="infoData.sex === '男'" />
            <a-icon type="woman" :style="{color: '#f45a8d'}" v-else />
          </h1>
          <p :title="infoData.sign">{{infoData.sign}}</p>
        </div>
      </div>
    </div>
    <infoMenu ref="zi"></infoMenu>
    <div class="info-content">
      <router-view :ID="infoData.ID" />
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import infoMenu from './infoMenu'
export default {
  name: 'Information',
  components: {
    navMenu,
    infoMenu
  },
  data () {
    return {
      otherShow: false,
      infoData: {},
      followAuthor: '',
      // maker: '',
      // showOwn: false,
      imgSrc: ''
    }
  },
  created () {
    this.UserInfo()
  },
  watch: {
  },
  methods: {
    // 获取用户信息
    UserInfo () {
      let maker = this.$route.query.maker
      this.$API.use('user/getUserInfo', {username: maker}, this.getUserInfo)
    },
    getUserInfo (res) {
      this.infoData = res.data[0] // 用户信息
      this.imgSrc = `http://localhost:3001/portrait/${this.infoData.avatar}.jpg` // 头像链接拼接
    }
  }
}
</script>

<style lang="less" scoped>
.Information {
  background: #F4F5F7;
}
.navMenu {
  box-shadow: 0 1px 3px #888888;
}
.Information-content {
  width: 1400px;
  margin: 0 auto;
  background: white;
}
.info-header {
  width: 1400px;
  margin: 0 auto;
  background: white;
  height: 300px;
  background: url('~@/assets/bg.jpg');
  background-size: 100% 100%;
  .my-info {
    display: flex;
    height: 80px;
    width: calc(100% - 20px);
    position: relative;
    top: 220px;
    margin-left: 20px;
    img {
      width: 66px;
      height: 66px;
      border: 2px solid white;
    }
    .info {
      margin-left: 20px;
      width: calc(100% - 230px);
      & > h1 {
        color: white;
      }
      & > p {
        height: 30px;
        line-height: 30px;
        color: white;
        font-size: 15px;
      }
    }
    .btn {
      height: 80px;
      line-height: 80px;
      width: 230px;
      text-align: right;
      margin-right: 20px;
    }
    .others {
      width: 130px;
      height: 120px;
      background: white;
      position: absolute;
      top: 60px;
      right: 0;
      border-radius: 5px;

      & > p {
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin: 0;
        &:hover {
          cursor: pointer;
          color: #00a1d6;
          background-color: #E5E9EF;
        }
      }
    }
  }
}
.ant-btn {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: 2px solid white;
}
.ant-btn-primary {
  background: #F45A8D;
  &:hover {
    background: rgba(244, 90, 141, 0.5);
  }
}
.anticon {
  cursor: pointer;
  margin-right: 0;
}
.info-content {
  background-color: #F4F5F7;
  width: 1400px;
  margin: 20px auto;
}
.ant-tag {
  position: relative;
  top: 30px;
  right: -50px;
}
</style>
