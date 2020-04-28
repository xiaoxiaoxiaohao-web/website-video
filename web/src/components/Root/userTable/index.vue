<template>
  <div class="userTable">
    <h3>用户信息</h3>
    <div class="user-table">
      <a-table :columns="columns" :dataSource="userData" :scroll="{ x: 1200 }" align="center">
        <template slot="avatar" slot-scope="text, record, index">
          <a-avatar :src="'http://localhost:3001/portrait/' + record.avatar + '.jpg'"  v-if="record.avatar !== null && record.avatar !== '' " />
          <a-avatar :src="'http://localhost:3001/portrait/logo.jpg'" v-else />
        </template>
        <template slot="sign" slot-scope="text, record, index">
          <p class="sign" :title="text">{{text}}</p>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <a-popconfirm
            title="你确定要删除此用户信息吗?"
            @confirm="onDeleteClick(record.ID)"
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
  name: 'userTable',
  data () {
    return {
      columns: [
        { title: 'ID', dataIndex: 'ID', key: 'ID', width: 60, fixed: 'left' },
        { title: '头像', dataIndex: 'avatar', key: 'avatar', width: 80, fixed: 'left', scopedSlots: { customRender: 'avatar' } },
        { title: '账号', width: 80, dataIndex: 'account', key: 'account' },
        { title: '用户名', dataIndex: 'username', key: 'username', width: 120 },
        { title: '密码', dataIndex: 'password', key: 'password', width: 150 },
        { title: '简介', dataIndex: 'sign', key: 'sign', width: 150, scopedSlots: { customRender: 'sign' } },
        { title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          width: 80
          // filters: [
          //   { text: '男', value: '男' },
          //   { text: '女', value: '女' }
          // ],
          // onFilter: (value, record) => record.sex.indexOf(value) === 0
        },
        { title: '电话', dataIndex: 'phone', key: 'phone', width: 150 },
        { title: '出生日期', dataIndex: 'birthday', key: 'birthday', width: 150 },
        { title: '权限', dataIndex: 'power', key: 'power', width: 80 },
        { title: '操作', width: 80, dataIndex: 'operation', key: 'operation', fixed: 'right', scopedSlots: { customRender: 'operation' } }
      ],
      userData: []
    }
  },
  created () {
    this.setUserData()
  },
  methods: {
    // 用户数据接口
    setUserData () {
      this.$API.use('root/getUserData', {}, this.getUserData)
    },
    // 获取用户数据
    getUserData (res) {
      if (res.state === '1') {
        res.data.forEach(element => {
          element.birthday = this.$moment(element.birthday).format('YYYY-MM-DD')
          this.userData.push(element)
        })
      } else {
        this.$message.error(res.msg)
        console.log(res.err)
      }
    },
    // 更新用户权限
    // 删除用户
    onDeleteClick (id) {
      this.$API.use('root/deleteUserData', {ID: id}, this.deleteUserData)
    },
    deleteUserData (res) {
      if (res.state === '1') {
        this.$message.success(res.msg)
        this.userData = []
        this.setUserData()
      } else {
        this.$message.error(res.msg)
        console.log(res.err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userTable {
  width: 100%;
  & > h3 {
    line-height: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #e7e7e7;
  }
  .user-table {
    padding: 20px 100px;
    .sign {
      width: 150px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
