<template>
  <div class="modifyData">
    <div class="modify-info">
      <a-upload
        name="avatar"
        action="http://localhost:3000/user/uploadAvatar"
        listType="picture-card"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        @change="onCoverChange"
      >
        <a-avatar v-if="imageUrl" :size="64" :src="imageUrl" shape="square" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
        </div>
        <p>点击更换头像</p>
      </a-upload>
      <div class="input-box">
        <span>用户昵称</span>
        <a-input style="width: 300px" v-model="userInfo.username" />
      </div>
      <div class="input-box">
        <span>我的签名</span>
        <a-textarea :autosize="{ minRows: 2, maxRows: 4 }" style="width: 500px" v-model="userInfo.sign"/>
      </div>
      <div class="input-box">
        <span>性别</span>
        <a-radio-group  buttonStyle="solid" v-model="userInfo.sex">
          <a-radio-button value="男">男</a-radio-button>
          <a-radio-button value="女">女</a-radio-button>
          <a-radio-button value="保密">保密</a-radio-button>
        </a-radio-group>
      </div>
      <div class="input-box">
        <span>出生日期</span>
        <a-date-picker style="width: 200px" placeholder="请选择日期" @change="onBirthdayChange" />
      </div>
      <div class="input-box">
        <span>手机号码</span>
        <a-input v-decorator="['phone', { rules: [{len: 11, require: true,  message: '请输入手机号码'}]}]" style="width: 400px" v-model="userInfo.phone">
          <a-select slot="addonBefore" style="width: 70px" v-decorator="['prefix', { initialValue: '86' }]">
            <a-select-option value="86">+86</a-select-option>
            <a-select-option value="87">+87</a-select-option>
          </a-select>
        </a-input>
      </div>
    </div>
    <div class="btn-group">
      <a-button @click="onConfirmClick">确定修改</a-button>
    </div>
  </div>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'modifyData',
  props: ['userInfo'],
  data () {
    return {
      loading: false,
      imageUrl: ''
    }
  },
  created () {
    this.imageUrl = 'http://localhost:3001/portrait/' + this.userInfo.avatar + '.jpg'
    // this.getOriginalInfo(this.userInfo)
  },
  methods: {
    // 上传封面前判断
    beforeUpload (file) {
      // 图片类型
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      // 图片大小
      const isLt2M = file.size / 1024 / 1024 <= 2
      if (!isJpgOrPng) {
        this.$message.error('你只能上传图片文件')
      }
      if (!isLt2M) {
        this.$message.error('图片一定要小于5M')
      }
      return isJpgOrPng && isLt2M
    },
    // 视频封面显示缩略图
    onCoverChange (info) {
      let file = info.file
      if (file.status === 'uploading') {
        this.loading = true
        return
      }
      if (file.status === 'done') {
        getBase64(file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
        // console.log('视频封面上传成功', file.response)
        this.userInfo.avatar = file.response.file.filename
      }
    },
    // 修改出生日期
    onBirthdayChange (res) {
      this.userInfo.birthday = this.$moment(res).format('YYYY-MM-DD')
    },
    // 确认修改信息
    onConfirmClick () {
      this.$API.use('user/updateUserInfo', this.userInfo, this.confirmSuccess)
    },
    // 修改成功返回信息
    confirmSuccess (res) {
      if (res.state === '1') {
        this.$message.success('修改信息成功')
        this.$emit('updateInfo', this.userInfo)
        this.$cookies.set('username', this.userInfo.username)
      } else {
        this.$message.error('修改信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modifyData {
  padding: 30px 100px;
  .modify-info {
    .input-box {
      display: flex;
      // height: 30px;
      // line-height: 30px;
      margin: 20px 0;
      & > span {
        width: 120px;
        line-height: 30px;
      }
    }
  }
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
.ant-avatar {
  cursor: pointer;
}
.ant-upload-list-picture-card .ant-upload-list-item {
  width: 64px;
  height: 64px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
  width: 64px;
  height: 64px;
  line-height: 64px;
}
</style>
