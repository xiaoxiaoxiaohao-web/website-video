<template>
  <div class="messageContent">
    <div class="content-title">
      <h3>视频评论</h3>
    </div>
    <div class="content-message">
      <h2>全部评论({{checkboxData.length}})</h2>
      <div class="all-choose">
        <a-checkbox :checked="checkAll" @change="onCheckAllChange">全选</a-checkbox>
      </div>
      <div class="check-box"  v-for="(val, index) in checkboxData" :key="index">
        <a-checkbox @change="onChange(val.checked)" class="box" v-model="val.checked" />
        <div class="box-content" @click="onVideoPlayerClick(val.vID)">
          <a-avatar :size="32" :src="'http://localhost:3001/portrait/' + val.avatar + '.jpg'" />
          <div class="content-info">
            <h3 @click="onAuthorClick(val.username)">{{val.username}}</h3>
            <p>{{val.content}} </p>
            <p>{{val.datetime}}</p>
          </div>
          <div class="content-video">
            <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" :alt="val.title" :title="val.title">
            <p :title="val.synopsis">{{val.synopsis}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageContent',
  data () {
    return {
      checkAll: false, // 全选
      // checkboxData: [
      //   {name: '2', checked: false},
      //   {name: '3', checked: false},
      //   {name: '1', checked: false}
      // ],
      checkboxData: []
    }
  },
  watch: {
  },
  created () {
    this.setMessageData()
  },
  methods: {
    // 全选
    onCheckAllChange (e) {
      this.checkAll = e.target.checked
      this.checkboxData.forEach(element => {
        element.checked = this.checkAll
      })
    },
    onChange (checked) {
      if (checked === false) { // 只要一个没选择，全选为false
        this.checkAll = false
      } else {
        this.judgeAllChecked()
      }
    },
    // 判断是否全部勾选
    judgeAllChecked () {
      let data = this.checkboxData
      let all = false
      for (let i = 0; i < data.length; i++) {
        if (data[i].checked === true) {
          all = true
        } else { // 只要有一个不是true，就直接跳出循环
          all = false
          break
        }
      }
      this.checkAll = all
    },
    // 评论数据连接
    setMessageData () {
      let ID = this.$route.query.ID
      this.$API.use('list/messageList', {ID: ID}, this.getMessageData)
    },
    // 获取评论数据
    getMessageData (res) {
      this.checkboxData = []
      if (res.state === '1') {
        res.data.forEach(element => {
          element.datetime = this.$moment(element.datetime).format('YYYY-MM-DD HH:mm:ss')
          element.checked = false
          this.checkboxData.push(element)
        })
        console.log(this.checkboxData)
      } else {
        console.log('获取最新评论失败', res.err)
      }
    },
    // 作者空间
    onAuthorClick (username) {
      let routerUrl = this.$router.resolve({ path: '/information', query: { maker: username } })
      window.open(routerUrl.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.messageContent {
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  padding: 20px 60px 0 60px;

  & > div {
    background: white;
    padding: 0 30px;
  }
  .content-title {
    border-bottom: 1px solid #e7e7e7 ;
    & > h3 {
      height: 64px;
      line-height: 64px;
      font-weight: 600;
      color: #00a1d6;
    }
  }
  .content-message{
    padding-top: 20px;
    & > h2 {
      height: 64px;
      line-height: 64px;
    }
    .all-choose {
      height: 30px;
      line-height: 30px;
    }
    .check-box {
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      padding-top: 20px;
      .box-content {
        padding: 0 20px;
        display: flex;
        width: 100%;
        cursor: pointer;
        .content-info {
          margin-left: 20px;
          & > h3:hover {
            color: #00a1d6;
          }
        }
        .content-video {
          margin-left: auto;
          width: 100px;
          & > img {
            width: 100px;
            height: 60px;
            border-radius: 4px;
          }
          & > p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: keep-all;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
