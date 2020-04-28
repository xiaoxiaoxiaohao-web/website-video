<template>
  <div class="indexMenu">
    <div class="indexMenu-left">
      <div class="L_icon" v-for="(val, i) in LiconData" :key="i" @click="onLiconClick(val.path)">
        <i :class="val.icon" />
        <p>{{val.name}}</p>
      </div>
    </div>
    <div class="indexMenu-middle">
      <div class="column" v-for="(val, i) in middleData" :key="i" @click="onMenuClick(val.type)">
        <p>{{val.type}}</p>
      </div>
    </div>
    <div class="indexMenu-right">
      <div class="svg-info" @click="onColumnClick" >
        <svg t="1574758948045" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="98129" data-spm-anchor-id="a313x.7781069.0.i80" width="24" height="24">
          <path d="M857.6 217.6V204.8c0 7.0656 5.7344 12.8 12.8 12.8h-12.8z m0 0h-66.6624V153.6H870.4a51.2 51.2 0 0 1 51.2 51.2v716.8a51.2 51.2 0 0 1-51.2 51.2H256a51.2 51.2 0 0 1-51.2-51.2v-80.896h64v68.096h588.8V217.6z m0 691.2H870.4a12.8 12.8 0 0 0-12.8 12.8v-12.8z m-588.8 0V921.6a12.8 12.8 0 0 0-12.8-12.8h12.8z m0 0V921.6a12.8 12.8 0 0 0-12.8-12.8h12.8z m0 0h588.8V217.6h-66.6624V153.6H870.4a51.2 51.2 0 0 1 51.2 51.2v716.8a51.2 51.2 0 0 1-51.2 51.2H256a51.2 51.2 0 0 1-51.2-51.2v-80.896h64v68.096z m588.8 0H870.4a12.8 12.8 0 0 0-12.8 12.8v-12.8z m0-691.2V204.8c0 7.0656 5.7344 12.8 12.8 12.8h-12.8z" fill="#23ADE5" p-id="98130" data-spm-anchor-id="a313x.7781069.0.i84" class=""></path>
          <path d="M436.6848 115.2L166.4 387.6352v418.7648h588.8V115.2H436.6848zM410.0608 51.2H768a51.2 51.2 0 0 1 51.2 51.2v716.8a51.2 51.2 0 0 1-51.2 51.2H153.6a51.2 51.2 0 0 1-51.2-51.2V361.2672L410.0096 51.2z" fill="#54E2E2" p-id="98131" data-spm-anchor-id="a313x.7781069.0.i81" class=""></path><path d="M428.8 72.3968h64V307.2c0 45.9264-37.2736 83.2-83.2 83.2H144.896v-64H409.6A19.2 19.2 0 0 0 428.8 307.2V72.3968z" fill="#23ADE5" p-id="98132" data-spm-anchor-id="a313x.7781069.0.i85" class=""></path>
          <path d="M544 371.2a32 32 0 1 1 0-64h153.6a32 32 0 1 1 0 64h-153.6zM288 576a32 32 0 1 1 0-64h409.6a32 32 0 1 1 0 64h-409.6z" fill="#23ADE5" p-id="98133" data-spm-anchor-id="a313x.7781069.0.i79" class=""></path>
        </svg>
        <p>专栏</p>
      </div>
      <div class="svg-info"  @click="onActivityClick">
        <svg t="1574758335217" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="70799" width="24" height="24">
          <path d="M113.664 9.216c-30.208 0-62.976 24.064-62.976 54.272v895.488c0 29.696 32.256 54.272 61.952 54.272s62.976-24.576 62.976-54.272V63.488c0-30.208-31.744-54.272-61.952-54.272z m644.608 74.752c-176.128 0-176.128-72.192-352.256-72.192-101.888 0-180.224 47.616-180.224 47.616L225.28 599.552s79.36-47.616 180.736-47.616c176.128 0 176.128 72.192 352.256 72.192 110.08 0 220.672-57.856 220.672-57.856V25.6c0.512 0.512-110.08 58.368-220.672 58.368z" fill="#F39800" p-id="70800" data-spm-anchor-id="a313x.7781069.0.i69" class=""></path>
          <path d="M542.208 449.536c-11.264 0-22.016-5.12-28.672-14.848l-97.792-133.12c-11.776-15.872-8.192-38.4 7.68-50.176 15.872-11.776 38.4-8.192 50.176 7.68l76.8 104.96 264.704-187.392c16.384-11.264 38.4-7.68 50.176 8.704 11.264 16.384 7.68 38.4-8.704 50.176L563.2 442.88c-6.656 4.096-13.824 6.656-20.992 6.656z" fill="#ffffff" p-id="70801" data-spm-anchor-id="a313x.7781069.0.i70" css=""></path>
        </svg>
        <p>活动</p>
      </div>
      <div class="svg-info" @click="onTopicClick">
        <svg t="1574928084162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4479" data-spm-anchor-id="a313x.7781069.0.i6" width="24" height="24">
          <path d="M507.302752 862.245578a509.181651 509.181651 0 0 1-230.935486-54.535046C226.754936 864.387523 140.917431 862.245578 140.917431 862.245578c36.986128-34.036257 39.052917-95.213211 38.235597-120.08044C91.840587 665.562422 37.577982 558.756404 37.577982 440.517284 37.577982 207.618349 247.883156 18.788991 507.302752 18.788991s469.724771 188.829358 469.724771 421.728293-210.305174 421.728294-469.724771 421.728294z" fill="#42CA6B" p-id="4480" data-spm-anchor-id="a313x.7781069.0.i2" class=""></path>
          <path d="M272.440367 440.517284m-37.577982 0a37.577982 37.577982 0 1 0 75.155964 0 37.577982 37.577982 0 1 0-75.155964 0Z" fill="#ffffff" opacity=".95" p-id="4481" data-spm-anchor-id="a313x.7781069.0.i5" class="selected"></path>
          <path d="M516.697248 440.517284m-37.577982 0a37.577982 37.577982 0 1 0 75.155963 0 37.577982 37.577982 0 1 0-75.155963 0Z" fill="#ffffff" opacity=".95" p-id="4482" data-spm-anchor-id="a313x.7781069.0.i3" class="selected"></path><path d="M742.165138 440.517284m-37.577982 0a37.577982 37.577982 0 1 0 75.155963 0 37.577982 37.577982 0 1 0-75.155963 0Z" fill="#ffffff" opacity=".95" p-id="4483" data-spm-anchor-id="a313x.7781069.0.i4" class="selected"></path>
        </svg>
        <p>专题</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexMenu',
  data () {
    return {
      LiconData: [
        {icon: 'icon-iMenu_sy', name: '首页', path: 'index'},
        // {icon: 'icon-iMenu_dt', name: '动态', path: 'dynamic'},
        {icon: 'icon-iMenu_dt', name: '空间', path: 'information'},
        {icon: 'icon-iMenu_phb', name: '排行榜', path: 'ranking'}
      ],
      middleData: []
    }
  },
  created () {
    this.$API.use('video/getVideoType', {}, this.getVideoType)
  },
  methods: {
    // 左边菜单点击
    onLiconClick (e) {
      if (e === 'information') {
        let username = this.$cookies.get('username') || window.localStorage.getItem('username')
        let routerUrl = this.$router.resolve({ path: '/' + e, query: {maker: username} })
        window.open(routerUrl.href, '_blank')
      } else if (e === 'ranking') {
        let routerUrl = this.$router.resolve({ path: '/' + e })
        window.open(routerUrl.href, '_blank')
      }
    },
    onMenuClick (type) {
      let routerUrl = this.$router.resolve({ path: '/typepage', query: {type: type} })
      window.open(routerUrl.href, '_blank')
    },
    // 专栏按钮
    onColumnClick () {
      let routerUrl = this.$router.resolve({path: '/read'})
      window.open(routerUrl.href, '_blank')
    },
    // 活动按钮
    onActivityClick () {
      let routerUrl = this.$router.resolve({path: '/act_list'})
      window.open(routerUrl.href, '_blank')
    },
    // 专题按钮
    onTopicClick () {
      let routerUrl = this.$router.resolve({path: '/topic'})
      window.open(routerUrl.href, '_blank')
    },
    // 获取视频类型
    getVideoType (res) {
      res.data.forEach(element => {
        this.middleData.push(element)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.indexMenu {
  width: 100%;
  height: 100px;
  display: flex;
}

.indexMenu-left {
  width: 18%;
  height: 55px;
  display: flex;
  margin: 25px 0 20px 0;
  border-right: 1px solid #e7e7e7;
  .L_icon {
    float: left;
    margin:  0 20px;
    text-align: center;
    &:hover {
      color: #00a1d6;
      cursor: pointer;
    }
    i {
      font-size: 35px;
    }
  }
}
.indexMenu-middle {
  width: 62%;
  height: 55px;
  margin: 25px 0 20px 0;
  border-right: 1px solid #e7e7e7;
  .column {
    width: calc(100%/6 - 40px);
    margin: 0 20px;
    float: left;
    font-size: 20px;
    line-height: 55px;
    &:hover {
      color: #00a1d6;
      cursor: pointer;
    }
    p {
      float: left;
      margin-right: 3px;
    }
    em {
      float: left;
      background-color: #73c9e5;
      margin-top: 20px;
      height: 12px;
      width: 30px;
      text-align: center;
      line-height: 12px;
      font-size: 12px;
      border-radius: 2px;
      color: white;
    }
  }
}
.indexMenu-right {
  width: 20%;
  height: 55px;
  // line-height: 55px;
  margin: 40px 0 20px 15px;
  .svg-info {
    width: calc(100% / 3);
    float: left;
    // height: 30px;
    display: flex;
    &:hover {
      color: #00a1d6;
      cursor: pointer;
    }
    & > p {
      // height: 30px;
      // line-height: 30px;
      margin-left: 5px;
    }
  }
}
.ant-popover {
  p:hover {
    color: #00a1d6;
  }
}
</style>
