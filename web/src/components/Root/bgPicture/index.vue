<template>
  <div class="bgPicture">
    <h3>背景图（广告）管理</h3>
    <div class="bg-content">
      <div class="index-carousel">
        <p>通用背景图(随机显示一张)</p>
        <pictureUpload :list="allFileList" :team="'1-1'"></pictureUpload>
      </div>
      <div class="recommend-carousel">
        <p>空间背景图(随机显示一张)</p>
        <pictureUpload :list="spaceFileList" :team="'2-1'"></pictureUpload>
      </div>
      <div class="create-carousel">
        <p>首页广告(随机显示一张)</p>
        <pictureUpload :list="advertFileList" :team="'3-1'"></pictureUpload>
      </div>
    </div>
  </div>
</template>

<script>
// import bgUpload from './bgUpload'
import pictureUpload from '../carouselPicture/pictureUpload'
export default {
  name: 'bgPicture',
  components: {
    pictureUpload
  },
  data () {
    return {
      allFileList: [],
      spaceFileList: [],
      advertFileList: []
    }
  },
  created () {
    this.setCarouselImg()
  },
  methods: {
    // 连接接口
    setCarouselImg () {
      this.$API.use('root/getCarouselImg', {}, this.getCarouselImg)
    },
    // 获取轮播图数据
    getCarouselImg (res) {
      if (res.state === '1') {
        this.getFileList(res.data)
      } else {
        this.$message.error(res.msg)
        console.log(res.err)
      }
    },
    // 根据小组区分不同的轮播图图片
    getFileList (data) {
      data.forEach(element => {
        element.url = 'http://localhost:3001/carousel/' + element.name + '.jpg'
        if (element.team === '1-1') {
          this.allFileList.push(element)
        } else if (element.team === '2-1') {
          this.spaceFileList.push(element)
        } else if (element.team === '3-1') {
          this.advertFileList.push(element)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bgPicture {
  width: 100%;
  & > h3 {
    line-height: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #e7e7e7;
  }
  .bg-content {
    padding: 20px 5%;
  }
}
</style>
