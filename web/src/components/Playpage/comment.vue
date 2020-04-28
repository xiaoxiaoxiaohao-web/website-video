<template>
  <div class="comment">
    <h3>用户评论</h3>
    <a-comment>
      <a-avatar
        slot="avatar"
        src="@/assets/timg.jpg"
        alt="Han Solo"
        :size="48"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" @change="handleChange" :value="value" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button htmlType="submit" :loading="submitting" @click="handleSubmit" type="primary">发表评论</a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-list
      v-if="comments.length"
      :dataSource="comments"
      :header="comments.length + '条评论'"
      itemLayout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.author"
          :avatar="'http://localhost:3001/portrait/' + item.avatar + '.jpg'"
          :content="item.content"
          :datetime="item.datetime"
        >
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: ['vID'],
  data () {
    return {
      comments: [],
      submitting: false,
      value: ''
    }
  },
  created () {
    // this.setCommnetsData()
  },
  watch: {
    vID: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.setCommnetsData(newVal)
        }
      }
    }
  },
  methods: {
    // 提交评论
    handleSubmit () {
      if (!this.value) { // 评论内容为空
        return this.$message.error('评论内容为空')
      } else {
        this.submitting = true
        let avatar = this.$store.state.avatar
        setTimeout(() => {
          this.submitting = false
          this.comments = [
            {
              author: this.$cookies.get('username') || window.localStorage.getItem('username'),
              avatar: avatar,
              content: this.value,
              datetime: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
              action: ''
            },
            ...this.comments
          ]
          this.value = ''
        }, 1000)
        // 保存弹幕数据（存数据库）
        let newComment = {
          vID: this.$route.params.vID,
          uID: this.$cookies.get('ID') || window.localStorage.getItem('ID'),
          content: this.value,
          datetime: this.$moment().format('YYYY-MM-DD HH:mm:ss')
        }
        this.$API.use('list/addCommentList', newComment, this.addCommentList)
      }
    },
    // 增加弹幕数据
    addCommentList (res) {
      console.log(res)
      if (res.state === '1') {
        this.$message.success('评论成功 ')
        // 增加评论量
        this.$API.use('video/updateVideoNum', {name: 'message', vID: this.$route.params.vID})
      } else {
        this.$message.error('发送评论失败')
        console.log(res.err)
      }
    },
    handleChange (e) {
      this.value = e.target.value
    },
    // 评论链接
    setCommnetsData (id) {
      this.$API.use('list/commentList', {vID: id}, this.getCommnetsData)
    },
    // 获取评论数据
    getCommnetsData (res) {
      if (res.state === '1') {
        this.comments = res.data
        this.comments.forEach(element => { // 时间转化格式
          element.datetime = this.$moment(element.datetime).format('YYYY-MM-DD HH:mm:ss')
          element.author = element.username
        })
      } else {
        this.$message.error('获取评论列表失败')
        console.log(res.err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  & > h3 {
    height: 50px;
    line-height: 50px;
  }
}
</style>
