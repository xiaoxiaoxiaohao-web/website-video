<template>
  <div class="navMenu">
    <div class="menu">
      <div class="menu-left">
        <ul>
          <li v-for="(v, i) in menuLData" :key="i" @click="onMenuLClick(v.path)">{{v.name}}</li>
        </ul>
      </div>
      <div class="menu-right">
        <ul>
          <a-dropdown>
            <a-avatar icon="user" v-if="imgSrc === null" />
            <a-avatar :src="imgSrc"  v-else/>
            <a-menu slot="overlay" v-if="loginStatus">
              <a-menu-item>
                <a @click="onUserClick"><a-icon type="user" />个人中心</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onRootClick" v-if="powerShow"><a-icon type="home" />管理员界面</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onOutClick"><a-icon type="export" />退出登录</a>
              </a-menu-item>
            </a-menu>
            <a-menu slot="overlay" v-else>
              <a-menu-item>
                <a @click="onLoginClick"><a-icon type="login" />登录</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onRegisterClick"><a-icon type="user-add" />注册</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <li v-for="(val, i) in menuRData" :key="i" @click="onMenuRClick(val.path)">{{val.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data () {
    return {
      menuLData: [
        {name: '主站', path: '/index'},
        {name: '空间', path: '/information'},
        {name: '排行榜', path: '/ranking'}
      ],
      menuRData: [
        {name: '专栏', path: '/read'},
        {name: '活动', path: '/act_list'},
        {name: '专题', path: '/topic'},
        {name: '创作中心', path: '/contribute/home'},
        {name: '投稿', path: '/contribute'}
      ],
      loginStatus: false,
      username: '',
      imgSrc: '',
      powerShow: false
    }
  },
  created () {
    this.judgeLoginStatus()
  },
  watch: {
    // username: {
    //   immediate: true,
    //   handler (newVal) {
    //     if (newVal) {
    //       this.loginStatus = true
    //     }
    //   }
    // }
  },
  methods: {
    // 判断是否已经登录
    judgeLoginStatus () {
      this.username = this.$cookies.get('username') === null ? window.localStorage.getItem('username') : this.$cookies.get('username')
      let power = this.$cookies.get('power') || window.localStorage.getItem('power')
      if (this.username !== null) {
        this.loginStatus = true
        this.getUserInfo(this.username)
        if (power === '0') {
          this.powerShow = true
        }
      } else {
        this.loginStatus = false
        this.imgSrc = ''
      }
    },
    // 登录
    onLoginClick () {
      this.$router.push({path: '/login'})
    },
    // 注册
    onRegisterClick () {
      this.$router.push({path: '/register'})
    },
    // 个人中心
    onUserClick () {
      if (this.username) {
        this.$router.push({path: '/personal', query: {username: this.username}})
      }
    },
    // // 个人空间
    // onSpaceClick () {
    //   if (this.username) {
    //     this.$router.push({path: '/information', query: {username: this.username}})
    //   }
    // },
    // 管理员界面
    onRootClick () {
      this.$router.push({path: '/root'})
    },
    // 退出登录
    onOutClick () {
      this.$message.success('退出登录成功')
      this.$router.push({path: '/login'})
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('ID')
      this.$cookies.remove('username')
      this.$cookies.remove('ID')
      this.loginStatus = false
    },
    // 左边菜单
    onMenuLClick (url) {
      if (url === '/information') {
        let username = this.$cookies.get('username') || window.localStorage.getItem('username')
        let routerUrl = this.$router.resolve({ path: url, query: {maker: username} })
        window.open(routerUrl.href, '_blank')
      } else if (url === 'ranking') {
        let routerUrl = this.$router.resolve({ path: url })
        window.open(routerUrl.href, '_blank')
      } else {
        this.$router.push({path: url})
      }
    },
    // 右边菜单
    onMenuRClick (url) {
      let id = this.$cookies.get('ID') || window.localStorage.getItem('ID')
      let routerUrl = this.$router.resolve({ path: url, query: {ID: id} })
      window.open(routerUrl.href, '_blank')
    },
    getUserInfo (username) {
      this.$API.use('user/getUserInfo', {username: username}, this.infoCallBack)
    },
    infoCallBack (res) {
      let avatar = res.data[0].avatar
      if (avatar) {
        this.imgSrc = 'http://localhost:3001/portrait/' + avatar + '.jpg'
        this.$store.commit('setAvatar', avatar)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navMenu {
  height: 42px;
  width: 100%;
  // background-color: rgba(142, 142, 150, 0.4);
  background: white;
  color: black ;
  position: absolute;
  top: 0;
}
.menu {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  line-height: 42px;
  font-size: 14px;
  .menu-left, .menu-right {
    padding-left: 50px;
    width: 50%;
    ul {
      list-style: none;
      display: flex;
      .ant-avatar {
        margin: 5px 0;
      }
      li {
        padding: 0 15px;
        &:hover {
          color: #00a1d6;
          cursor: pointer;
        }
      }
    }
  }
  .menu-right {
    margin-left: 28%;
    .ant-avatar:hover {
      cursor: pointer;
    }
    li:last-child {
      background-color: #f45a8d;
      color: white;
      height: 47px;
      font-size: 14px;
      width: 60px;
      border-radius: 0 0 5px 5px;
      text-align: center;

      &:hover {
        color: white;
      }
    }
  }
}
// .ant-dropdown-menu {
//   padding-left: 0;
// }
// .anticon{
//   padding-right: 10px;
// }
</style>
