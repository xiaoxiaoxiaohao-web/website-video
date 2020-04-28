<template>
  <div class="Register">
    <div class="Register-content">
      <h1>注册</h1>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input placeholder="账号" :model="account" v-decorator="['account', { rules: [{ required: true, message: '请输入你的账号' }] }]" />
        </a-form-item>
        <a-form-item>
          <a-input
            type="password"
            placeholder="用户密码(6-12个字符组成，区分大小写)"
            :model="password"
            v-decorator="['password', { rules: [ {min: 6, message: '密码不能少于6个字符'}, {require: true, message: '请输入你的密码' }] }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input placeholder="用户昵称" :model="username" v-decorator="['username', { rules: [{ required: true, message: '请输入你的昵称' }] }]" />
        </a-form-item>
        <a-form-item>
          <a-input placeholder="填写常用手机号码" v-decorator="['phone', { rules: [{len: 11, require: true,  message: '请输入手机号码'}]}]">
            <a-select slot="addonBefore" style="width: 70px" v-decorator="['prefix', { initialValue: '86' }]">
              <a-select-option value="86">+86</a-select-option>
              <a-select-option value="87">+87</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-row :gutter="6">
            <a-col :span="16">
              <a-input placeholder="请输入短信验证码"/>
            </a-col>
            <a-col :span="8">
              <a-button type="primary" v-if="gain" @click="onGainCodeClick">点击获取</a-button>
              <a-button v-else disabled>{{count}}s后重新获取</a-button>
            </a-col>
           </a-row>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit">注册</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onLoginClick">返回登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      submitDisabled: false,
      gain: true,
      count: 60,
      account: '',
      username: '',
      password: '',
      userValue: {}
    }
  },
  methods: {
    // 注册提交信息按钮
    handleSubmit (e) {
      // e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.userValue = values
          this.$API.use('user/userRegister', values, this.userRegister)
        }
      })
    },
    // 注册返回信息
    userRegister (res) {
      if (res.state === '0') { // 登录失败
        this.$message.error('注册失败')
      } else { // 注册后跳转首页成功
        this.$message.success('注册成功')
        this.$router.push({path: '/index'})
        this.$cookies.set('username', this.userValue.username)
        this.$cookies.set('power', 2)
      }
    },
    // 获取验证码（暂未联通功能）
    onGainCodeClick () {
      this.gain = false
      let _this = this
      let clock = window.setInterval(() => {
        _this.count--
        if (_this.count < 0) {
          window.clearInterval(clock)
          _this.count = 60
          _this.gain = true
        }
      }, 1000)
    },
    onLoginClick () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="less" scoped>
.Register {
  width: 100%;
}
.Register-content {
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
  .ant-form-item {
    margin-left: 30%;
    width: 40%;

     .ant-btn, .ant-input, .ant-form-item-control {
      width: 100%;
      height: 40px !important;
    }
  }
}
</style>
