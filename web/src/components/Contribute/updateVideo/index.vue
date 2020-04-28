<template>
  <div class="updateVideo">
    <a-button @click="onBacklick"><a-icon type="rollback" />返回</a-button>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <div class="basic-info">
        <h2>修改视频信息</h2>
        <a-form-item label="标题">
          <a-input v-decorator="['note', { rules: [{ required: true, message: '请输入标题' }] }]" :maxLength="30" v-model="info.title" />
        </a-form-item>
        <a-form-item label="分区">
          <a-select style="width: 180px;" placeholder="点击选择" v-model="info.type" @change="onSelectChange">
            <a-select-option :value="val.type" v-for="(val, index) in typeData" :key="index">{{val.type}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="标签">
          <a-radio-group buttonStyle="solid" v-model="info.label">
            <a-radio-button :value="val.label" v-for="(val, index) in labelData" :key="index">{{val.label}}</a-radio-button>
        </a-radio-group>
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea  placeholder="填写更全面的信息，让更多人找到你的视频" :autosize="{ minRows: 6, maxRows: 6 }" :maxLength="150" v-model="info.synopsis"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSureClick">确定修改</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'updateVideo',
  data () {
    return {
      typeData: [],
      labelData: [],
      info: {} // 视频信息
    }
  },
  watch: {
    info: {
      immediate: true,
      handler (newVal) {
        if (Object.keys(newVal).length !== 0) {
          this.$API.use('video/getVideoLabel', {type: newVal.type}, this.getVideoLabel)
        }
      }
    }
  },
  created () {
    this.setVideoInfo()
    this.$API.use('video/getVideoType', {}, this.getVideoType)
  },
  methods: {
    // 返回按钮
    onBacklick () {
      this.$router.push({path: '/contribute/manuscript'})
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
    // 确定修改
    onSureClick () {
      this.$API.use('video/updateVideoInfo', this.info, this.updateVideoInfo)
    },
    // 更新视频信息
    updateVideoInfo (res) {
      if (res.state === '1') {
        this.$message.success('修改成功,等待审核')
        this.$router.push({path: '/contribute/manuscript'})
      } else {
        this.$message.error('修改失败')
      }
    },
    setVideoInfo () {
      this.$API.use('video/getVideoUrl', {vID: this.$route.params.vID}, this.getVideoInfo)
    },
    getVideoInfo (res) {
      if (res.state === '1') {
        this.info = res.data[0]
      } else {
        this.$message.error('出现错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.updateVideo {
  padding: 30px 20%;
  margin-top: 50px;
  h2 {
    font-weight: bold;
    margin-bottom: 10px;
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
.ant-btn {
  float: right;
}
</style>
