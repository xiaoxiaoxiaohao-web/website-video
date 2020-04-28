<template>
  <div class="Root">
    <div class="root-menu" :class="theme === 'dark'? 'dark': 'light'">
      <div class="style-choose">
        <a>样式选择：</a>
        <a-switch
          defaultChecked
          @change="changeTheme"
          checkedChildren="夜间"
          unCheckedChildren="白天"
        />
      </div>
      <br />
      <a-menu
        style="width: 230px;"
        mode="inline"
        :theme="theme"
        :openKeys="['sub2']"
        :selectedKeys="[current]"
        @click="handleClick"
      >
        <a-sub-menu
          :key="'sub' + index"
          v-for="(val, index) in menuData"
          v-if="val.children.length > 0"
        >
          <span slot="title"><a-icon :type="val.icon" /><span>{{val.title}}</span></span>
          <a-menu-item-group>
            <a-menu-item :key="val.title + i" v-for="(item, i) in val.children" @click="onMenuClick(item.path)">{{item.name}}</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item :key="'sub' + index" v-else @click="onMenuClick(val.path)"><a-icon :type="val.icon" />{{val.title}}</a-menu-item>
      </a-menu>
    </div>
    <div class="menu-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data () {
    return {
      current: 'sub0',
      theme: 'dark',
      menuData: [
        { title: '用户管理', icon: 'user', path: '/root/userTable', children: [] },
        { title: '视频管理', icon: 'play-square', path: '/root/videoData', children: [] },
        { title: '图片管理',
          icon: 'folder-open',
          children: [
            {name: '轮播图', path: '/root/carouselPicture'},
            {name: '背景图', path: '/root/bgPicture'}
          ]
        },
        { title: '回到首页', icon: 'rollback', path: '/index', children: [] }
      ]
    }
  },
  created () {

  },
  methods: {
    onMenuClick (path) {
      this.$router.push({path: path})
    },
    changeTheme (checked) {
      this.theme = checked ? 'dark' : 'light'
    },
    handleClick (e) {
      if (this.current !== e.key) {
        this.current = e.key
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Root {
  display: flex;
  width: 100%;
  height: 100%;
  .root-menu {
    height: 100%;
    position: fixed;
    border-right: 1px solid #e8e8e8;
    z-index: 1000;
    // width: 230px;
    .style-choose {
      height: 50px;
      line-height: 50px;
    }
  }
  .menu-content {
    margin-left: 230px;
    width: calc(100% - 230px);
    min-width: 1200px;
  }
}
.dark {
  background: black;
}
.light {
  background: white;
}
</style>
