<template>
  <div class="modifyPassword">
    <h3>密码修改</h3>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="原密码" v-bind="formItemLayout">
        <a-input-password
          placeholder="输入原密码"
          v-decorator="['oldPsw', { rules: [{require: true, message: '请输入你的密码' }] }]"
        />
      </a-form-item>
      <a-form-item label="新密码" v-bind="formItemLayout">
        <a-input-password
          placeholder="输入新密码"
          v-decorator="['newPsw', { rules: [ {min: 6, message: '密码不能少于6个字符'}, {require: true, message: '请输入你的密码' }] }]"
        />
      </a-form-item>
      <a-form-item label="确认密码" v-bind="formItemLayout">
        <a-input-password
          placeholder="确认新密码"
          v-decorator="['confirmPsw', { rules: [ {require: true, message: '请确认新密码' }] }]"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">确定修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'modifyPassword',
  data () {
    return {
      newPsw: '',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formItemLayout: {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 36 },
          sm: { span: 20 }
        }
      }
    }
  },
  methods: {
    // 确认修改密码
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.newPsw = values.newPsw
          if (values.newPsw !== values.confirmPsw) {
            this.$message.error('两次密码输入不相同')
          } else {
            let ID = this.$cookies.get('ID') || window.localStorage.getItem('ID')
            this.$API.use('user/judgePsw', {ID: ID, password: values.oldPsw}, this.judgePsw)
          }
        }
      })
    },
    // 判断原始密码
    judgePsw (res) {
      if (res.state === '1') { // 原密码正确则修改密码
        let ID = this.$cookies.get('ID') || window.localStorage.getItem('ID')
        this.$API.use('user/updatePsw', {password: this.newPsw, ID: ID}, this.confirmSuccess)
      } else {
        this.$message.error('原密码错误')
      }
    },
    confirmSuccess (res) {
      if (res.state === '1') {
        this.$message.success('修改密码成功')
        this.$emit('updateInfo', '')
      } else {
        this.$message.error('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modifyPassword {
  margin: 20px 10%;
  & > h3 {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .btn-group {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 20px 0;
    & > .ant-btn {
      margin:0px 80px;
    }
  }
}
</style>
