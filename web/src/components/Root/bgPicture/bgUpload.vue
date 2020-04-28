<template>
  <div class="bgUpload">
    <div>
      <a-upload
        action="http://localhost:3000/root/uploadCarousel"
        listType="picture"
        name="carousel"
        :fileList="fileList"
        @change="onChange"
      >
        <a-button :disabled="btnDisabled"><a-icon type="upload" /> 上传 </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bgUpload',
  props: ['list'],
  data () {
    return {
      btnDisabled: true,
      // fileList: [
      //   {
      //     uid: '1',
      //     name: 'xxx.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      //   }
      // ]
      fileList: []
    }
  },
  created () {
    this.fileList = this.list
  },
  methods: {
    onChange (res) {
      let file = res.file // 获取变化的文件
      let fileList = res.fileList // 获取变化后的列表
      if (fileList.length === 0) { // 当不存在图片时才可以用上传按钮
        let fileName
        if (file.response === undefined) { // 获取之前存在的图片的name
          fileName = file.name
        } else { // 获取新上传的图片的name
          fileName = file.response.file.filename
        }
        console.log(fileName)
        this.$API.use('root/deleteCarousel', {name: fileName, team: this.team}, this.deleteCarousel)
        this.btnDisabled = false
      } else { // 增加背景图
        if (file.status === 'done') { // 上传成功后
          let r = file.response
          // 数据库存入数据
          this.$API.use('root/addCarouselData', {name: r.file.filename, team: this.team}, this.addCarouselData)
          this.btnDisabled = true
        }
      }
      this.fileList = fileList
    },
    // 删除背景图
    deleteCarousel (res) {
      console.log(res)
      if (res.state === '1') {
        this.$message.success('删除成功')
      } else {
        console.log(res.err)
        this.$message.error('删除失败')
      }
    },
    // 增加背景图
    addCarouselData (res) {
      if (res.state === '1') {
        this.$message.success('上传图片成功')
      } else {
        this.$message.error('上传失败')
      }
    }
  }
}
</script>

<style scoped>
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
</style>
