<template>
  <div class="videoData">
    <h3>需要审核的视频</h3>
    <div class="video-data" v-if="videoData.length > 0">
      <div class="video-card" v-for="(item, index) in videoData" :key="index">
        <div class="main-info">
          <div class="video-img" >
            <img :src="'http://localhost:3001/images/' + item.src + '.jpg'" alt="缩略图">
          </div>
          <div class="video-info">
            <h2 @click="onTitleClick(index)">{{item.title}}</h2>
            <p>{{item.time}}</p>
            <p><span>{{item.type}} >>> {{item.label}}</span> <span style="color:red;">{{item.reason}}</span></p>
          </div>
          <div class="btn-group">
            <a-button type="primary" @click="onPassClick(item.vID)">通过</a-button>
            <a-button type="danger" @click="onNoPassClick">不通过</a-button>
            <a-modal title="不通过原因" :visible="visible" @ok="handleOk(item.vID)" @cancel="handleCancel" okText="确定" cancelText="取消">
              <a-radio-group @change="onChange" v-model="value">
                <a-radio :style="radioStyle" :value="i" v-for="(val, i) in reason" :key="i">{{val}}</a-radio>
                <a-radio :style="radioStyle" :value="3">
                  其他原因...
                  <a-input v-if="value === 3" :style="{ width: 100, marginLeft: 10 }" v-model="otherReason" />
                </a-radio>
              </a-radio-group>
            </a-modal>
          </div>
        </div>
        <div class="show-detail" @click="onShowDetailClick(index)">
          <a-icon type="caret-down" theme="filled" />
        </div>
        <div class="detail-info" v-if="item.detailShow">
          <inlinePlayer :videoInfo="item"></inlinePlayer>
        </div>
      </div>
    </div>
    <a-empty v-else>
      <span slot="description"> 暂无需要审核视频数据 </span>
    </a-empty>
  </div>
</template>

<script>
import inlinePlayer from './inlinePlayer'
export default {
  name: 'videoData',
  components: {
    inlinePlayer
  },
  data () {
    return {
      videoData: [],
      visible: false,
      radioStyle: { // 单选样式
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      reason: ['视频与网站已有视频重复/相同', '视频内容涉及违法行为', '视频内容涉及禁止行为'],
      otherReason: '', // 输入原因
      value: 0,
      noPassReason: '' // 不通过原因
    }
  },
  created () {
    this.setVideoData()
  },
  watch: {
    otherReason: {
      immediate: true,
      handler (newVal) {
        this.noPassReason = newVal
      }
    }
  },
  methods: {
    // 需要审核视频的连接
    setVideoData () {
      this.$API.use('root/getVideoData', {}, this.getVideoData)
    },
    // 获取审核视频的数据
    getVideoData (res) {
      if (res.state === '1') {
        this.videoData = []
        res.data.forEach(element => {
          element.detailShow = false // 增加详细视频显示属性
          element.time = this.$moment(element.time).format('YYYY-MM-DD HH:mm:ss')
          this.videoData.push(element)
        })
      } else {
        this.$message.error(res.msg)
        console.log(res.err)
      }
    },
    // 通过按钮
    onPassClick (vID) {
      this.$API.use('root/stateVideo', {state: '已通过', vID: vID, reason: ''}, this.passVideo)
    },
    // 视频通过消息
    passVideo (res) {
      if (res.state === '1') {
        this.$message.success('该视频审核通过')
        this.setVideoData()
      } else {
        this.$message.error('出现问题')
      }
    },
    // 不通过
    onNoPassClick () {
      this.visible = true
    },
    // 不通过确认
    handleOk (vID) {
      if (this.noPassReason === '') { // 提示信息
        this.$message.error('不通过原因为空')
      } else { // 不通过
        this.visible = false
        this.value = 0
        this.$API.use('root/stateVideo', { state: '未通过', vID: vID, reason: this.noPassReason }, this.noPassVideo)
      }
    },
    noPassVideo (res) {
      if (res.state === '1') {
        this.$message.success('该视频审核不通过')
        this.videoData = []
        this.setVideoData()
      } else {
        this.$message.error('出现问题')
        console.log(res.err)
      }
    },
    // 不通过取消
    handleCancel () {
      this.visible = false
    },
    // 不通过原因的选择
    onChange (e) {
      let index = e.target.value
      if (index < 3) {
        this.noPassReason = this.reason[index]
      } else {
        this.otherReason = ''
      }
    },
    // 点击标题
    onTitleClick (index) {
      this.onShowDetailClick(index)
    },
    // 显示详细信息
    onShowDetailClick (index) {
      this.videoData[index].detailShow = !this.videoData[index].detailShow
    }
  }
}
</script>

<style lang="less" scoped>
.videoData {
  width: 100%;
  & > h3 {
    line-height: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #e7e7e7;
  }
  .video-data {
    padding: 20px 100px;
    .video-card {
      width: 100%;
      min-height: 140px;
      border-radius: 4px;
      background: #fff;
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #e5e9ef;
      .main-info {
        display: flex;
        .video-img {
          width: 160px;
          height: 100px;
          cursor: pointer;
          & >img {
            width: 160px;
            height: 100px;
            border-radius: 4px;
          }
        }
        .video-info {
          margin-left: 20px;
          & > h2 {
            width: 500px;
            height: 30px;
            line-height: 30px;
            color: #00a1d6;
            overflow: hidden;
            word-break: keep-all;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              cursor: pointer;
            }
          }
          & > p {
            height: 15px;
            margin-top: 10px;
            // & > span:hover {
            //   color: #00a1d6;
            //   cursor: pointer;
            // }
          }
        }
        .btn-group {
          margin-left: auto;
          height: 100px;
          line-height: 100px;
          & > .ant-btn {
            margin-right: 20px;
          }
        }
      }
      .show-detail {
        text-align: center;
        &:hover {
          cursor: pointer;
          color: #00a1d6;
        }
      }
    }
  }
}
</style>
