<template>
  <div class="Read">
    <navMenu></navMenu>
    <div class="Read-content">
      <div class="Read-title">
        <h2>网站专栏</h2>
        <ul>
          <li v-for="(val, i) in titleData" :key="i" @click="onTitleClick(val.path, i)" ref="li">
            <i :class=" 'icon-'+ val.icon" /> <span>{{val.name}}</span>
          </li>
        </ul>
      </div>
      <div class="main-content">
        <router-view />
      </div>
      <div class="Read-rank">

      </div>
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
export default {
  name: 'Read',
  components: {
    navMenu
  },
  data () {
    return {
      titleData: [
        {name: '推荐', icon: 'read_tj', path: ''},
        {name: '动画', icon: 'read_dh', path: 'cartoon'},
        {name: '游戏', icon: 'read_yx', path: 'game'},
        {name: '影视', icon: 'read_ys', path: 'video'},
        {name: '生活', icon: 'read_sh', path: 'life'},
        {name: '兴趣', icon: 'read_xq', path: 'interest'},
        {name: '科技', icon: 'read_kj', path: 'science'}
      ]
    }
  },
  mounted () {
    this.$refs.li[0].setAttribute('style', 'color:#00a1d6; font-size: 32px;')
  },
  methods: {
    // 点击菜单事件
    onTitleClick (e, i) {
      this.$router.push({path: '/read/' + e})
      // 点击选中时保持选中状态
      this.$refs.li.forEach((element, n) => {
        if (i === n) {
          this.$refs.li[n].setAttribute('style', 'color:#00a1d6; font-size: 32px;')
        } else {
          this.$refs.li[n].removeAttribute('style')
        }
      })
    }
  }
  // mounted () {
  //   this.$refs.li[0].setAttribute('style', 'color:#00a1d6')
  // }
}
</script>

<style lang="less" scoped>
.navMenu {
  box-shadow: 0 1px 3px #888888;
}
.Read-content {
  width: 1400px;
  margin: 50px auto;
  display: flex;
}
.Read-title {
  width: 150px;
  text-align: center;
  h2 {
    color: #00a1d6;
    height: 50px;
    line-height: 50px;
  }
  li {
    font-size: 20px;
    list-style: none;
    height: 40px;
    line-height: 40px;
    margin: 20px 0;
    & > span {
      font-size: 15px;
      margin-left: 15px;
    }
    &:hover {
      cursor: pointer;
      color: #00a1d6;
      font-size: 32px;
    }
  }
}
.main-content {
  width: 800px;
}
</style>
