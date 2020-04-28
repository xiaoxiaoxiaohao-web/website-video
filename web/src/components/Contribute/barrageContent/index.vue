<template>
  <div class="barrageContent">
    <div class="content-title">
      <h3>稿件弹幕</h3>
    </div>
    <div class="content-barrage">
      <h2>稿件弹幕</h2>
      <div class="barrage-btn">
        <a-button type="primary" @click="onAllDeleteClick" :disabled="!hasSelected">删除弹幕</a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{`选中了 ${selectedRowKeys.length} 条弹幕`}}
          </template>
        </span>
      </div>
      <a-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data"
      >
        <template slot="txt" slot-scope="text, record, index">
          <p class="video-txt">{{text}}</p>
          <p class="video-title" @click="onVideoPlayerClick(record.vID)">视频：{{record.title}}</p>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <a-popconfirm
            title="你确定要删除这条弹幕吗?"
            @confirm="onDeleteClick(record.bID)"
            okText="确定"
            cancelText="取消"
          >
             <a-button>删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'barrageContent',
  data () {
    return {
      columns: [
        {
          title: '发送者',
          dataIndex: 'username'
        },
        {
          title: '播放时间(毫秒)',
          dataIndex: 'start'
        },
        {
          title: '弹幕内容',
          dataIndex: 'txt',
          scopedSlots: { customRender: 'txt' }
        },
        {
          title: '发送时间',
          dataIndex: 'sendtime'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [],
      selectedRowKeys: []
    }
  },
  created () {
    this.setBarrageData()
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 弹幕连接
    setBarrageData () {
      let ID = this.$route.query.ID
      this.$API.use('list/barrageList', {ID: ID}, this.getBarrageData)
    },
    // 获取弹幕数据
    getBarrageData (res) {
      this.data = []
      if (res.state === '1') {
        res.data.forEach(element => {
          element.key = (element.bID).toString()
          element.sendtime = this.$moment(element.sendtime).format('YYYY-MM-DD HH:mm:ss')
          this.data.push(element)
        })
      } else {
        this.$message.error('请求弹幕数据出错')
        console.log(res.err)
      }
    },
    // 删除全选弹幕按钮
    onAllDeleteClick () {

    },
    // 删除弹幕按钮
    onDeleteClick (bID) {
      this.$API.use('user/deleteBarrage', {bID: bID}, this.deleteBarrage)
    },
    // 删除后信息回馈
    deleteBarrage (res) {
      if (res.state === '1') {
        this.$message.success(res.msg)
        this.setBarrageData()
        // this.tableShow = true
      } else {
        this.$message.error(res.msg)
        console.log(res.err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.barrageContent {
  .content-title {
    border-bottom: 1px solid #e7e7e7 ;
    & > h3 {
      height: 64px;
      line-height: 64px;
      font-weight: 600;
      color: #00a1d6;
      text-align: center;
    }
  }
  .content-barrage {
    padding: 20px 160px;
    .barrage-btn {
      margin: 20px 0;
    }
  }
}
.video-txt {
  width: 260px;
  margin: 0;
  overflow: hidden;
}
.video-title {
  width: 260px;
  font-size: 10px;
  padding: 0;
  color: #99a2aa;
  overflow: hidden;
  &:hover {
    color: #00a1d6;
    cursor: pointer;
  }
}
.a-modal /deep/ .ant-modal-mask {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
