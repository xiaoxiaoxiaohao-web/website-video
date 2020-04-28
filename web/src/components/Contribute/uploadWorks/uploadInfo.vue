<template>
  <div class="uploadDetaile">
  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <div class="basic-info">
      <h2>基本信息</h2>
      <a-form-item label="标题">
        <a-input v-decorator="['note', { rules: [{ required: true, message: '请输入标题' }] }]" :maxLength="30" v-model="info.title" />
      </a-form-item>
      <div class="cover-setting">
        <p>视频封面设置</p>
        <span>(格式jpeg、png，文件大小≤5MB)</span>
      </div>
      <a-upload
        name="img"
        action="http://localhost:3000/video/uploadCover"
        listType="picture-card"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        @change="onCoverChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="cover"  class="img-cover"/>
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
        </div>
      </a-upload>
      <a-form-item label="分区">
        <a-select style="width: 180px;" placeholder="点击选择" @change="onSelectChange" v-model="info.type">
          <a-select-option :value="val.type" v-for="(val, index) in typeData" :key="index">{{val.type}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标签">
        <a-radio-group buttonStyle="solid" v-model="info.label">
          <a-radio-button :value="val.label" v-for="(val, index) in labelData" :key="index">{{val.label}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="参与活动(可不选择)">
        <a-radio-group buttonStyle="solid" v-model="info.act" >
          <a-radio-button :value="val.aID" v-for="(val, index) in actListData" :key="index">{{val.actName}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="简介">
        <a-textarea  placeholder="填写更全面的信息，让更多人找到你的视频" :autosize="{ minRows: 6, maxRows: 6 }" :maxLength="150" v-model="info.synopsis"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onContributeClick">立即投稿</a-button>
      </a-form-item>
    </div>
  </a-form>
  </div>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'uploadDetaile',
  props: ['address', 'name'],
  data () {
    return {
      loading: false,
      imageUrl: '',
      typeData: [],
      labelData: [],
      actListData: [],
      info: { // 上传视频的信息
        ID: '',
        vID: '',
        title: '',
        synopsis: '',
        type: '',
        time: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        address: '',
        src: '',
        label: '',
        act: ''
      }
    }
  },
  created () {
    this.$API.use('video/getVideoType', {}, this.getVideoType)
    this.setActListData()
  },
  watch: {
    address: {
      immediate: true,
      handler (newVal) {
        this.info.address = newVal
      }
    },
    name: {
      immediate: true,
      handler (newVal) { // 获取视频名，默认为标题
        this.info.title = newVal.slice(0, -4)
      }
    }
  },
  methods: {
    // 上传封面前判断
    beforeUpload (file) {
      // 图片类型
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      // 图片大小
      const isLt2M = file.size / 1024 / 1024 <= 5
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
        this.info.src = file.response.file.filename
      }
    },
    // 获取视频类型
    getVideoType (res) {
      this.typeData = res.data
    },
    // 根据类型后查询标签
    onSelectChange (e) {
      this.$API.use('video/getVideoLabel', {type: e}, this.getVideoLabel)
    },
    // 获取类型的标签
    getVideoLabel (res) {
      this.labelData = res.data
    },
    // 活动链接
    setActListData () {
      this.$API.use('list/actList', {}, this.getActListData)
    },
    // 获取活动列表
    getActListData (res) {
      if (res.state === '1') {
        this.actListData = res.data
      } else {
        this.$message.error('获取活动列表失败')
      }
    },
    // 提交按钮
    onContributeClick () {
      this.info.ID = this.$route.query.ID
      this.info.vID = this.info.src.substring(0, 10) + this.info.address.substring(0, 10)
      let value = this.info
      if (value.act === null) {
        value.act = 0
      }
      this.$API.use('video/uploadVideoInfo', value, this.videoInfo)
    },
    // 投稿信息
    videoInfo (res) {
      if (res.state === '1') {
        this.$message.success('投稿成功，等待审核')
        this.$router.push({path: '/contribute/manuscript', query: { ID: this.$route.query.ID }})
      } else {
        this.$message.error('投稿失败')
        console.log(res.err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.uploadDetaile {
  margin-top: 50px;
  h2 {
    font-weight: bold;
  }
  .cover-setting {
    display: flex;
    height: 40px;
    line-height: 40px;
    & > p {
      margin-right: 15px;
    }
  }
  .img-cover {
    width: 200px;
    height: 126px;
  }
}
// .ant-upload /deep/ .ant-upload-select-picture-card{
//   width: 300px;
//   height: 250px;
// }
.ant-upload-list-picture-card .ant-upload-list-item {
  width: 200px;
  height: 126px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
  width: 200px;
  height: 126px;
  line-height: 126px;
}
</style>
