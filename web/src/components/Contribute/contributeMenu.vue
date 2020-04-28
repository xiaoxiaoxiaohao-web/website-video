<template>
  <div class="contributeMenu">
    <a-menu
      style="width: 200px;"
      :openKeys.sync="openKeys"
      :defaultSelectedKeys="['']"
      mode="inline"
    >
      <a-button type="primary" @click="onUploadClick" ><a-icon type="upload" /> 投稿</a-button>
      <a-sub-menu
        :key="'sub' +index"
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
</template>

<script>
export default {
  name: 'contributeMenu',
  data () {
    return {
      openKeys: ['sub3'], // 默认打开的菜单
      // 菜单列表数据
      menuData: [
        {title: '首页', icon: 'home', path: '/home', children: []},
        { title: '稿件管理', icon: 'folder-open', path: '/manuscript', children: [] },
        {title: '数据中心', icon: 'line-chart', path: '/data_core', children: []},
        {
          title: '互动管理',
          icon: 'message',
          children: [
            {name: '评论管理', path: '/message'},
            {name: '弹幕管理', path: '/barrage'}
          ]
        },
        {title: '创作设置', icon: 'setting', path: '/setting', children: []}
      ]
    }
  },
  methods: {
    // 选择菜单
    onMenuClick (path) {
      this.$emit('selectMenu', path)
    },
    // 投稿视频
    onUploadClick () {
      this.$emit('selectMenu', '/upload')
    }
  }
}
</script>

<style lang="less" scoped>
.contributeMenu {
  padding-top: 80px;
  height: 100%;
  position: fixed;
  border-right: 1px solid #e8e8e8;
  z-index: 1000;
  // overflow-y: scroll;
  // text-align: left;
}
.ant-btn-primary {
  width: 136px;
  height: 40px;
  background-color: #00a1d6;
  margin-left: 24px;
}
</style>
