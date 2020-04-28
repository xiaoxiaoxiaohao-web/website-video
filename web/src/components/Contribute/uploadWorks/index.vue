<template>
  <div class="uploadWorks">
    <div class="file-upload">
      <h2>视频上传</h2>
      <span>(推荐采用mp4,flv格式,可有效缩短审核转码耗时)</span>
    </div>
    <a-upload-dragger
    name="files"
    action="http://localhost:3000/video/uploadVideo"
    :beforeUpload="beforeUpload"
    :remove="remove"
    @change="handleChange"
    :disabled="uploadDisabled"
    >
      <div class="ant-upload-drag-icon">
        <a-icon type="upload" :style="{ fontSize: '36px' }"/>
        <p>拖拽视频到此处可上传 </p>
      </div>
      <a-button type="primary" size="large" > 上传视频 </a-button>
      <p class="ant-upload-hint"></p>
    </a-upload-dragger>
    <uploadInfo v-if="showVideoInfo" :address="address" :name="name"></uploadInfo>
    <!-- <uploadInfo v-if="true" :address="address" :name="name"></uploadInfo> -->
  </div>
</template>

<script>
import uploadInfo from './uploadInfo'
export default {
  name: 'uploadWorks',
  components: {
    uploadInfo
  },
  data () {
    return {
      showDetaile: true,
      showVideoInfo: false,
      uploadDisabled: false,
      address: '',
      name: ''
    }
  },
  created () {
  },
  methods: {
    // 判断上传文件的类型（上传文件时判断）
    beforeUpload (file) {
      if (file.type.includes('video')) {
        this.showVideoInfo = true
        this.uploadDisabled = true
        // console.log(file.type)
      } else {
        this.$message.error('请上传视频文件')
        return false
      }
    },
    handleChange (info) {
      let file = info.file
      if (file.status === 'done') { // 上传完成
        // console.log('视频上传成功', file.response)
        this.address = file.response.file.filename
        this.name = file.name
        this.$message.success('上传成功')
      }
    },
    // 移除上传的视频
    remove (info) {
      if (info.response) {
        let res = info.response
        if (res.state === '1') {
          let name = res.file.filename
          this.$API.use('video/deleteVideo', {name: name})
          this.$message.success('移除成功')
          this.address = this.name = ''
          this.uploadDisabled = false
          this.showVideoInfo = false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.uploadWorks {
  padding: 30px 20%;
  .file-upload {
    display: flex;
    height: 40px;
    line-height: 40px;
    & > h2 {
      font-weight: bold;
      margin-right: 15px;
    }
  }
  .ant-upload-drag-icon {
    height: 100px;
    margin-top: 50px;
  }
  .ant-upload-hint {
    height: 50px;
    line-height: 50px;
  }
}
.ant-btn-primary {
  padding: 0 50px;
  background-color: #00a1d6;
}
</style>
