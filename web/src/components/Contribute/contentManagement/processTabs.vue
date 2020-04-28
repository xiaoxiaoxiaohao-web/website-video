<template>
  <div class="processTabs">
    <a-tabs type="card">
      <a-tab-pane tab="进行中" key="进行中">
        <examineCard v-for="(item, index) in showExaminingData" :key="index" :item="item">
          <a-button type="primary" slot="button"  @click="onEditClick(item.vID)">编辑</a-button>
        </examineCard>
        <a-pagination v-model="examiningCurrent" :total="examiningData.length" @change="onExaminingCurrentChange" v-if="showExaminingData.length > 0" />
        <a-empty v-else >
          <span slot="description"> 暂无数据 </span>
        </a-empty>
      </a-tab-pane>
      <a-tab-pane tab="已通过" key="已通过">
        <examineCard v-for="(item, index) in showExaminedData" :key="index" :item="item">
          <a-button type="primary" slot="button" @click="onEditClick(item.vID)">编辑</a-button>
        </examineCard>
        <a-pagination v-model="examinedCurrent" :total="examinedData.length" @change="onExaminedCurrentChange" v-if="showExaminedData.length > 0" />
        <a-empty v-else >
          <span slot="description"> 暂无数据 </span>
        </a-empty>
      </a-tab-pane>
      <a-tab-pane tab="未通过" key="未通过">
        <examineCard v-for="(item, index) in showFailData" :key="index" :item="item">
          <a-button type="dashed" slot="button" @click="onAppealClick">申诉</a-button>
          <a-modal slot="modal" title="申诉理由" :visible="visible" @ok="handleOk(item.vID)" @cancel="handleCancel" okText="确定" cancelText="取消">
            <a-input :style="{ width: 100, marginLeft: 10 }" v-model="appealReason" />
          </a-modal>
        </examineCard>
        <a-pagination v-model="failCurrent" :total="failData.length"  @change="onFailCurrentChange" v-if="showFailData.length > 0" />
        <a-empty v-else >
          <span slot="description"> 暂无数据 </span>
        </a-empty>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import examineCard from './examineCard'
export default {
  name: 'processTabs',
  components: {
    examineCard
  },
  data () {
    return {
      examiningCurrent: 1, // 进行中页码
      examiningData: [], // 进行中数据
      showExaminingData: [], // 显示进行中的数据
      examinedCurrent: 1, // 已通过页码
      examinedData: [], // 已通过数据
      showExaminedData: [], // 显示已通过的数据
      failCurrent: 1, // 未通过页码
      failData: [], // 未通过数据
      showFailData: [], // 显示未通过数据
      visible: false,
      appealReason: ''
    }
  },
  created () {
    this.videoDataInterface()
  },
  watch: {

  },
  methods: {
    // 用户视频数据接口
    videoDataInterface () {
      let ID = this.$cookies.get('ID') || window.localStorage.getItem('ID')
      this.$API.use('user/getUserVideo', {ID: ID}, this.getUserVideoData)
    },
    // 获取用户全部视频数据
    getUserVideoData (res) {
      if (res.state === '1') {
        this.getSortVideoData(res.data)
      } else {
        this.$message.error('查询失败')
      }
    },
    // 视频数据分类
    getSortVideoData (data) {
      data.forEach(element => {
        switch (element.state) {
          case '进行中':
            this.examiningData.push(element)
            break
          case '已通过':
            this.examinedData.push(element)
            break
          default:
            this.failData.push(element)
            break
        }
      })
      this.getUserShowVideoData()
    },
    // 初始显示数据(默认第一页)
    getUserShowVideoData () {
      this.onExaminingCurrentChange(this.examiningCurrent)
      this.onExaminedCurrentChange(this.examinedCurrent)
      this.onFailCurrentChange(this.failCurrent)
    },
    // 进行中页码改变事件
    onExaminingCurrentChange (res) {
      let page = res
      this.showExaminingData = []
      this.onPageChange(this.examiningData, this.showExaminingData, page)
    },
    // 已通过页码改变事件
    onExaminedCurrentChange (res) {
      let page = res
      this.showExaminedData = []
      this.onPageChange(this.examinedData, this.showExaminedData, page)
    },
    // 未通过页码改变事件
    onFailCurrentChange (res) {
      let page = res
      this.showFailData = []
      this.onPageChange(this.failData, this.showFailData, page)
    },
    // 页面改变事件
    onPageChange (originData, showData, page) {
      let i = (page - 1) * 10 // 获取开始的数据
      let len = page * 10 // 获取显示的长度，默认为10
      if (len > originData.length) { // 判断是否大于数据的长度
        len = originData.length
      }
      for (; i < len; i++) {
        showData.push(originData[i])
      }
    },
    // 编辑修改信息
    onEditClick (vID) {
      this.$router.push({path: '/contribute/updateVideoInfo/' + vID})
    },
    // 申诉
    onAppealClick () {
      this.visible = true
    },
    // 申诉理由确认
    handleOk (vID) {
      if (this.appealReason === '') { // 提示信息
        this.$message.error('申诉原因不能为空')
      } else { // 申诉成功
        this.visible = false
        let reason = '申诉理由：' + this.appealReason
        this.$API.use('video/appealVideo', { reason: reason, vID: vID }, this.appealVideo)
      }
    },
    appealVideo (res) {
      if (res.state === '1') {
        this.$message.success('申诉成功，等待审核')
      } else {
        this.$message.error(res.msg)
        console.log(res.err)
      }
    },
    // 申诉取消
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.processTabs {
  margin-bottom: 30px;
}
.ant-tabs >>> .ant-tabs-nav .ant-tabs-tab {
  margin-right: 20px;
}
.ant-pagination {
  text-align: center;
}
</style>
