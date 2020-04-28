<template>
  <div class="cartoon">
    <div class="cartoon-header">
      <i class="icon-column_mh" />
      <div class="info">
        <p>漫画</p>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="人气推荐" key="1" class="pane">
            <div class="cartoonCard" v-for="(val, i) in cartoonCardData" :key="i">
              <img :src="require('@/assets/cartoon/' + val.src)" alt="漫画">
              <h4>{{val.title}}</h4>
              <p>{{val.style}}</p>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="今日更新推荐 " key="2" class="pane">
            <div class="cartoonCard" v-for="(val, i) in cartoonUpdateData" :key="i">
              <img :src="require('@/assets/cartoon/' + val.src)" alt="漫画">
              <h4>{{val.title}}</h4>
              <p>{{val.style}}</p>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import cartoonCard from '@/components/Public/cartoonCard'
export default {
  name: 'cartoon',
  components: {
    cartoonCard
  },
  data () {
    return {
      cartoonCardData: [
        {src: '1-1.jpg', title: '动物狂想曲', style: '校园'},
        {src: '1-2.jpg', title: '斗罗大陆', style: '热血 冒险'},
        {src: '1-3.jpg', title: '异常生物见闻录', style: '搞笑 奇幻'},
        {src: '1-4.jpg', title: '步天哥', style: '古风 玄幻'},
        {src: '1-5.jpg', title: '刀剑神域', style: '科幻 冒险'},
        {src: '1-6.jpg', title: '忧国的莫里亚蒂', style: '冒险 悬疑'},
        {src: '1-7.jpg', title: '驭灵师', style: '热血 搞笑'},
        {src: '1-8.jpg', title: '文豪野犬', style: '冒险 热血'},
        {src: '1-9.jpg', title: '女装大佬养成记', style: '搞笑 古风'},
        {src: '1-10.jpg', title: '樱才学园学生会', style: '搞笑 校园'}
      ],
      cartoonUpdateData: [
        {src: '2-1.jpg', title: '大唐不断网', style: '搞笑 古风'},
        {src: '2-2.jpg', title: '王家，奴家减个肥', style: '搞笑 恋爱'},
        {src: '2-3.jpg', title: '全职法师', style: '热血 校园'},
        {src: '2-4.jpg', title: '终结炽天使', style: '热血 奇幻'},
        {src: '2-5.jpg', title: '我在皇宫当巨巨', style: '少女 古风'},
        {src: '2-6.jpg', title: '齐木楠雄的灾难', style: '校园 日常'},
        {src: '2-7.jpg', title: '如果历史是一群喵', style: '萌系 治愈'},
        {src: '2-8.jpg', title: '精灵宝可梦', style: '冒险 热血'},
        {src: '2-9.jpg', title: '嫁给一个死太监', style: '少女 古风'},
        {src: '2-10.jpg', title: '不要欺负我，同学', style: '搞笑 恋爱'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.cartoon {
  height: 600px;
}
.cartoon-header {
  height: 50px;
  width: 100%;
  display: flex;
  i {
    font-size: 30px;
  }
  .info {
    margin-left: 8px;
    font-size: 22px;
    line-height: 30px;
    display: flex;
    width: calc(100% - 38px);
    & > p {
      width: 10%;
    }
  }
}
.ant-tabs {
  margin-left: -140px;
  height: 600px;
  width: 100%;
}
.ant-tabs {
  /deep/ .ant-tabs-bar {
    margin: 0 0 8px 100px ;
    border-bottom: none;
  }
}
.ant-tabs {
  /deep/ .ant-tabs-tab {
    margin: 0 10px;
    padding: 5px;
  }
}
.pane {
  display: flex;
  flex-wrap: wrap;
}
.cartoonCard {
  margin-right: 15px;

 &:nth-child(5n + 1) {
   margin-right: 0;
 }
  img {
    height: 227px;
    width: 190px;
  }
}

</style>
