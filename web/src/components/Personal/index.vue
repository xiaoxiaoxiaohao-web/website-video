<template>
  <div class="Personal">
    <navMenu></navMenu>
    <div class="personal-center">
      <div class="personal-title">
        <h3>个人中心</h3>
      </div>
      <modifyData v-if="modify" :userInfo="userData" @updateInfo="updateInfo"></modifyData>
      <modifyPassword v-else-if="modifyPsw" @updateInfo="updateInfo"></modifyPassword>
      <div class="personal-content" v-else>
        <div class="main-info">
          <a-avatar :size="64" :src="imgSrc" shape="square" />
          <div class="username-sign">
            <h3>{{userData.username}}</h3>
            <p>{{userData.sign}}</p>
          </div>
        </div>
        <div class="title">
          <span class="title-name">其他信息</span>
        </div>
        <div class="other-info">
          <p>用户ID: {{userData.ID}}</p>
          <p>性别： {{userData.sex}}</p>
          <p>出生日期：{{userData.birthday}}</p>
          <p>绑定手机号码：{{userData.phone}}</p>
        </div>
        <div class="btn-group">
          <a-button @click="onModifyDataClick">修改资料</a-button>
          <a-button @click="onmodifyPasswordClick">修改密码</a-button>
          <a-button type="primary" @click="onSpaceClick">个人空间<a-icon type="right" /></a-button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import modifyData from './modifyData'
import modifyPassword from './modifyPassword'
import Footer from '@/components/Public/Footer'
export default {
  name: 'Personal',
  components: {
    navMenu,
    modifyData,
    modifyPassword,
    Footer
  },
  data () {
    return {
      modify: false, // 是否修改信息
      userData: {},
      imgSrc: '',
      modifyPsw: false // 是否修改密码
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息接口
    getUserInfo () {
      let username = this.$route.query.username
      this.$API.use('user/getUserInfo', {username: username}, this.infoCallBack)
    },
    // 获取用户信息
    infoCallBack (res) {
      this.userData = res.data[0]
      this.userData.birthday = this.$moment(this.userData.birthday).format('YYYY-MM-DD') // 修改出生日期样式
      if (this.userData.avatar !== null) { // 存在头像
        this.imgSrc = `http://localhost:3001/portrait/${this.userData.avatar}.jpg`
      } else { // 默认头像（头像不存在情况）
        this.imgSrc = 'http://localhost:3001/portrait/logo.jpg'
      }
    },
    // 修改信息按钮事件
    onModifyDataClick () {
      this.modify = true
    },
    // 修改密码按钮
    onmodifyPasswordClick () {
      this.modifyPsw = true
    },
    // 更新按钮
    updateInfo (data) {
      if (data !== '') {
        this.userData = data
      }
      this.modifyPsw = false
      this.modify = false
    },
    // 个人空间
    onSpaceClick () {
      let maker = this.userData.username
      this.$router.push({path: '/information', query: {maker: maker}})
    }
  }
}
</script>

<style lang="less" scoped>
.navMenu {
  box-shadow: 1px 2px 1px #e1e2e5;
}
.personal-center {
  margin: 80px 20%;
  width: 60%;
  min-width: 900px;
  border: 1px solid #e1e2e5;
  .personal-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fafafa;
    text-align: center;
    border-bottom: 1px solid #e1e2e5;
  }
  .personal-content {
    padding: 30px 100px;
    .main-info {
      display: flex;
      .username-sign {
        width: calc(100% - 30px - 64px);
        margin-left: 30px;

        & > p {
          margin-top: 10px;
          height: 20px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .other-info {
      margin-top: 10px;
      padding-left: 20px;
    }
    .realname-certification {
      margin-top: 10px;
      padding-left: 20px;
      // width: 100%;
    }
  }
  .btn-group {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 20px 0;
    & > .ant-btn {
      margin:0px 30px;
    }
  }
}
.title {
  height: 30px;
  line-height: 30px;
  border-left: 4px solid #00a1d6;
  margin-top: 10px;
  .title-name{
    margin-left: 10px;
    color: #00a1d6;
    font-size: 14px;
  }
}
</style>
