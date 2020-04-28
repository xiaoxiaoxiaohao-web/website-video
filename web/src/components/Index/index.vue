<template>
  <div class="Index">
    <div class="Index-header">
      <!-- <anchor></anchor> -->
      <navMenu></navMenu>
      <div class="header">
        <img :src="headerImg" alt="海报图">
      </div>
    </div>
    <div class="Index-content">
      <!-- <contentMenu></contentMenu> -->
      <indexMenu></indexMenu>
      <div class="recommend">
        <carousel :carouselData="carouselData"></carousel>
        <div class="carousel-right">
          <div v-for="(val, index) in contentImg" :key="index" class="img-card" @click="onVideoPlayerClick(val.vID)">
            <img :src="'http://localhost:3001/images/' + val.src + '.jpg'" :title="val.title" :alt="val.title" />
          </div>
        </div>
      </div>
      <div class="column-recommend">
        <popularize></popularize>
        <recommendList></recommendList>
      </div>
      <div class="now-movies">
        <movies></movies>
        <moviesMenu></moviesMenu>
      </div>
      <div class="my-science">
        <science></science>
        <rankingList></rankingList>
      </div>
      <!-- <div class="new-opera">
        <opera></opera>
        <rankingList></rankingList>
      </div> -->
      <!-- <div class="new-cartoon">
        <cartoon></cartoon>
      </div> -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import indexMenu from '@/components/Public/indexMenu'
import carousel from '@/components/Public/carousel'
import popularize from './popularize'
import recommendList from './recommendList'
import movies from './movies'
import moviesMenu from './moviesMenu'
import science from './science'
import rankingList from './rankingList'
import opera from './opera'
import create from './create'
import cartoon from './cartoon'
import Footer from '@/components/Public/Footer'
export default {
  name: 'Index',
  components: {
    // anchor,
    navMenu,
    indexMenu,
    carousel,
    popularize,
    recommendList,
    movies,
    moviesMenu,
    science,
    rankingList,
    opera,
    create,
    cartoon,
    Footer
  },
  data () {
    return {
      // contentImg: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
      contentImg: [],
      carouselData: [],
      headerImg: ''
    }
  },
  created () {
    this.setBackgroundImg('1-1')
    this.setCarouselData('1')
    this.setContentImg(8)
  },
  methods: {
    // 接口连接
    setContentImg (num) {
      this.$API.use('video/getPopularizeData', {num: num}, this.getContentImg)
    },
    // 获取推广数据
    getContentImg (res) {
      if (res.state === '1') {
        res.data.forEach((element, index) => {
          this.$set(this.contentImg, index, element)
        })
      } else {
        this.$message.error('推广数据查询失败')
      }
    },
    // 轮播图数据接口
    setCarouselData (team) {
      this.$API.use('video/getCarouselImg', {team: team}, this.getCarouselData)
    },
    // 获取轮播图数据
    getCarouselData (res) {
      if (res.state === '1') {
        this.carouselData = res.data
      } else {
        console.log('轮播图数据出现错误', res.err)
      }
    },
    // 背景图接口
    setBackgroundImg (team) {
      this.$API.use('video/getBackgroundImg', {team: team}, this.getBackgroundImg)
    },
    getBackgroundImg (res) {
      if (res.state === '1') {
        this.headerImg = 'http://localhost:3001/carousel/' + res.data[0].name + '.jpg'
      } else {
        this.headerImg = '@/assets/timg.jpg'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.anchor {
  width: 100px;
  position: fixed;
  right: 5%;
  top: 310px;
}
.navMenu {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}
.header img {
  width: 100%;
  height: 200px;
  min-width: 1400px;
}

.Index-content {
  width: 1400px;
  margin: 0 auto;
  .recommend {
    display:flex;
    margin: 10px 0;
  }
  .carousel {
    width: 36%;
    height: 280px ;
    margin-right: 50px;
  }
}
.carousel-right {
  width: 66%;
  height: 280px;
  border: 2px dashed #00a1d6;
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: calc(25% - 10px);
    height: calc(140px - 4px - 6px);
    margin:3px 5px;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }
}
.column-recommend {
  margin-top: 40px;
  width: 100%;
  display: flex;
  .popularize {
    width: 75%;
  }
  .recommendList {
    width: 25%;
  }
}
.now-movies, .my-science, .new-opera, .new-cartoon {
  margin-top: 40px;
  width: 100%;
  display: flex;
}
.movies, .science, .opera, .cartoon {
  width: 75%;
}
.moviesMenu, .rankingList {
  width: 24%;
  margin-left: 1%;
}
.Footer {
  margin-top: 50px;
}
</style>
