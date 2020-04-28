<template>
  <div class="Login">
    <div class="Login-content">
      <h1>登录</h1>
      <div class="main">
        <a-input placeholder="请输入你的账号" v-model="account" />
        <a-input-password placeholder="密码" v-model="password"/>
        <div class="info">
          <p>
            <a-checkbox v-model="checked">记住我</a-checkbox>
            <span>不是自己电脑不要勾选此项</span>
          </p>
          <p>
            <a>忘记密码？</a>
          </p>
          <div class="button-group">
            <a-button type="primary" @click="onLoginClick">登录</a-button>
            <a-button @click="onRegisterClick">注册</a-button>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer'
export default {
  name: 'Login',
  components: {
    Footer
  },
  data () {
    return {
      account: '',
      password: '',
      checked: false
    }
  },
  methods: {
    // 登录按钮
    onLoginClick () {
      this.$API.use('user/userLogin', {account: this.account, password: this.password}, this.resultLogin)
    },
    // 登录验证结果返回
    resultLogin (res) {
      if (res.state === '0') { // 登录失败
        this.$message.error('登录账号或密码错误') // 提示消息
      } else { // 登录成功
        this.$message.success('登录成功')
        let username = res.data[0].username
        let ID = res.data[0].ID
        let power = res.data[0].power
        this.$router.push({path: '/index', query: {username: username}}) // 跳转首页
        if (this.checked) { // 选择保存长久
          window.localStorage.setItem('username', username)
          window.localStorage.setItem('ID', ID)
          window.localStorage.setItem('power', power)
        } else { // 短暂保存
          this.$cookies.set('username', username)
          this.$cookies.set('ID', ID)
          this.$cookies.set('power', power)
        }
      }
    },
    // 注册按钮
    onRegisterClick () {
      this.$router.push('register')
    }
    // // 获取用户信息(登录成功后)
    // getUserInfo () {
    //   this.$API.use('user/getUserInfo', {username: this.$route.query.username}, this.infoCallBack)
    // },
    // infoCallBack (res) {
    //   let ownInfo = res.data[0]
    //   ownInfo.birthday = this.$moment(ownInfo.birthday).format('YYYY-MM-DD')
    //   this.$store.commit('setOwnInfo', ownInfo)
    // }
  }
}
</script>

<style lang="less" scoped>
.Login {
  width: 100%;
}
.Login-header {
  width: 100%;
  height: 100px;
}
.Login-content {
  margin-top: 100px;
  position: relative;
  width: 1100px;
  height: 500px;
  left: calc(50% - 550px);
  text-align: center;
  border-top: 1px solid #DDDDDD;

  h1 {
    position: relative;
    width: 120px;
    height: 40px;
    left: calc(50% - 60px);
    top: -30px;
    background-color: white;
    font-size: 36px;
  }
}
.main {
  width: 100%;
  height: 280px;
  .ant-input, .ant-input-password {
    width: 60%;
    height: 40px;
    margin-top: 20px;
  }
  .info {
    width: 60%;
    margin: 40px 20%;
    text-align: left;
    font-size: 12px;
    p:first-child {
      width: 70%;
      float: left;
    }
    p:last-child {
      width: 30%;
      float: left;
    }
    .button-group {
      width: 100%;
      display: flex;
      .ant-btn {
        width: 43%;
        margin-left: 7%;
      }
      .ant-btn:first-child {
        margin-left: 0;
        margin-right: 7%;
      }
    }
    .other-login {
      margin-top: 20px;
      i {
        font-size: 24px;
      }
      span {
        font-size: 12px;
        margin-right: 20px;
      }
    }
  }
}
</style>
