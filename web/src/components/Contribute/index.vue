<template>
  <div class="Contribute">
    <div class="contribute-header">
      <h2>网站创作中心</h2>
      <span @click="onIndexClick">首页</span>
      <div class="personal-info">
        <a-avatar :size="32" src="@/assets/timg.jpg" @click="onAvatarClick" title="个人中心" />
      </div>
    </div>
    <div class="contibute-content">
      <contributeMenu @selectMenu="selectMenu"></contributeMenu>
      <div class="menu-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import contributeMenu from './contributeMenu'
export default {
  name: 'Contribute',
  components: {
    contributeMenu
  },
  data () {
    return {

    }
  },
  methods: {
    // 首页按钮
    onIndexClick () {
      let routerUrl = this.$router.resolve({ path: '/index' })
      window.open(routerUrl.href, '_blank')
    },
    // 选择菜单
    selectMenu (path) {
      let ID = this.$cookies.get('ID') || window.localStorage.getItem('ID')
      this.$router.push({path: '/contribute' + path, query: {ID: ID}})
    },
    // 个人中心
    onAvatarClick () {
      let username = this.$cookies.get('username') || window.localStorage.getItem('username')
      this.$router.push({path: '/personal', query: {username: username}})
    }
  }
}
</script>

<style lang="less" scoped>
.Contribute {
  width: 100%;
  height: 100%;
}
.contribute-header {
  position: fixed;
  height: 60px;
  line-height: 60px;
  width: 100%;
  background-color: white;
  padding: 0 50px;
  box-shadow: 0px 2px 2px rgba(0,0,0,.05);
  z-index: 1005;
  display: flex;
  & > h2 {
    color: #00a1d6;
    font-weight: 600;
    width: 150px;
  }
  & > span:hover {
    cursor: pointer;
    color: #00a1d6;
  }
  .personal-info {
    margin-left: auto;
    .ant-avatar {
      cursor: pointer;
    }
  }
}
.contibute-content {
  width: 100%;
  height: 100%;
  display: flex;
  .menu-content {
    width: 100%;
    min-width: 1000px;
    margin-top: 60px;
    margin-left: 200px;
  }
}
</style>
