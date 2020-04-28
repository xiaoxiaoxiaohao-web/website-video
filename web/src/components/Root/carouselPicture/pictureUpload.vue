<template>
  <div class="pictureUpload">
    <div class="clearfix">
      <a-upload
        action="http://localhost:3000/root/uploadCarousel"
        name='carousel'
        listType="picture-card"
        :fileList="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 5">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width:100%" :src="previewImage" />
      </a-modal>
    </div>
    <!-- <div>
      <a-button type="primary" @click="onSureClick">确定</a-button>
    </div> -->
  </div>
</template>

<script>
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'pictureUpload',
  props: ['list', 'team'],
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: []
      // newFile: {}
    }
  },
  created () {
    this.fileList = this.list
  },
  watch: {
    // newFile: {
    //   immediate: true,
    //   handler (newVal) {
    //     this.setCarouselData(newVal, this.team)
    //   }
    // }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 改变轮播图的列表
    handleChange (res) {
      console.log(res)
      let file = res.file // 获取变化的文件
      let fileList = res.fileList // 获取变化后的列表
      if (fileList.length < this.fileList.length) { // 删除了轮播图
        let fileName
        if (file.response === undefined) { // 获取之前存在的图片的name
          fileName = file.name
        } else { // 获取新上传的图片的name
          fileName = file.response.file.filename
        }
        this.$API.use('root/deleteCarousel', {name: fileName, team: this.team}, this.deleteCarousel)
      } else { // 增加轮播图
        if (file.status === 'done') { // 上传成功后
          let res = file.response
          // 数据库存入数据
          this.$API.use('root/addCarouselData', {name: res.file.filename, team: this.team}, this.addCarouselData)
        }
      }
      this.fileList = fileList
    },
    // 删除轮播图
    deleteCarousel (res) {
      if (res.state === '1') {
        this.$message.success('删除成功')
      } else {
        console.log(res.err)
        this.$message.error('删除失败')
      }
    },
    // 增加轮播图
    addCarouselData (res) {
      if (res.state === '1') {
        this.$message.success('上传图片成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    // 确定按钮
    onSureClick () {
    }
  }
}
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.clearfix >>> .ant-upload-select-picture-card, .clearfix >>> .ant-upload-list-item {
  width: 200px;
  height: 150px;
}
.clearfix >>> .ant-upload-list-item-info span {
  height: 100%;
  width: 100%;
}
</style>
