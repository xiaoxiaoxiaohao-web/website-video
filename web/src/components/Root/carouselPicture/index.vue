<template>
  <div class="carouselPicture">
    <h3>轮播图管理</h3>
    <div class="carousel-content">
      <div class="index-carousel">
        <p>首页的轮播图</p>
        <pictureUpload :list="indexFileList" :team="'1'"></pictureUpload>
      </div>
      <div class="recommend-carousel">
        <p>为你推荐的轮播图</p>
        <pictureUpload :list="recommendFileList" :team="'2'"></pictureUpload>
      </div>
      <div class="create-carousel">
        <p>创作中心的轮播图</p>
        <pictureUpload :list="createFileList" :team="'3'"></pictureUpload>
      </div>
    </div>
  </div>
</template>

<script>
import pictureUpload from './pictureUpload'
export default {
  name: 'carouselPicture',
  components: {
    pictureUpload
  },
  data () {
    return {
      indexFileList: [],
      recommendFileList: [],
      createFileList: []
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
        if (element.team === '1') {
          this.indexFileList.push(element)
        } else if (element.team === '2') {
          this.recommendFileList.push(element)
        } else if (element.team === '3') {
          this.createFileList.push(element)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.carouselPicture {
  width: 100%;
  & > h3 {
    line-height: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #e7e7e7;
  }
  .carousel-content {
    padding: 20px 5%;
  }
}
</style>
