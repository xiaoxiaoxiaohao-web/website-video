<template>
  <div class="contentMenu">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="index">首页</a-menu-item>
      <a-sub-menu v-for="val in menuData" :key="val.key">
        <span slot="title" class="submenu-title-wrapper">{{val.name}}</span>
        <a-menu-item-group>
          <a-menu-item v-for="list in val.children" :key="list"><a-icon type="right" :style="{color: '#02A2D6' }" />{{list}}</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'contentMenu',
  data () {
    return {
      current: ['index'],
      menuData: [
        {name: '动画', key: 'animation', children: ['MAD·AMY', 'MMD·3D', '短片·手书·配音', '特摄', '综合']},
        {name: '番剧', key: 'opera', children: ['连载动画', '完结动画', '资讯', '新番时间表']},
        {name: '国创', key: 'create', children: ['国产动画', '国产原创相关', '资讯', '国产动画时间索引']},
        {name: '音乐', key: 'music', children: ['原创音乐', '翻唱', '电音', '演奏', 'MV', '音乐现场', '音乐综合', '音频']},
        {name: '舞蹈', key: 'dance', children: ['宅舞', '街舞', '明星舞蹈', '中国舞', '舞蹈教程']},
        {name: '游戏', key: 'games', children: ['单机游戏', '电子竞技', '手机游戏', '网络游戏', '游戏赛事']},
        {name: '科技', key: 'science', children: ['趣味科普人文', '野生技术协会', '机械', '汽车']},
        {name: '生活', key: 'life', children: ['搞笑', '日常', '美食圈', '手工', '绘画']},
        {name: '娱乐', key: 'entertainment', children: ['综艺', '明星', '其他相关']},
        {name: '影视', key: 'movies', children: ['影视杂谈', '影视剪辑', '短片', '预告·资讯']}
      ]
    }
  }
}
</script>

<style scoped>
.ant-menu {
  font-size: 12px;
}
.ant-menu-item-group-list > .ant-menu-item {
  padding: 0;
  margin: 0;
  font-size: 12px ;
}
</style>
