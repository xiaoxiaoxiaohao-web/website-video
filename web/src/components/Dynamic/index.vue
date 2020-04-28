<template>
  <div class="Dynamic">
    <navMenu></navMenu>
    <div class="dynamic-content">
      <div class="content-left">
        <div class="my-info">
          <img src="@/assets/timg.jpg" alt="背景图">
          <div @mouseover="onInfoMouseEnter" @mouseout="onInfoMouseLeave">
            <a-avatar :size="64" icon="user" />
             <h4>我还是输给你了</h4>
            <personalCard v-show="infoShow" ></personalCard>
          </div>
          <div class="state">
            <div class="state_more" v-for="n in stateData" :key="n">
              <p>{{n.num}}</p>
              <h5>{{n.title}}</h5>
            </div>
          </div>
        </div>
        <!-- <towntalk :towntalkData='followTowntalkData'>我关注的话题</towntalk> -->
      </div>
      <div class="content-middle">
        <div class="share">
          <a-textarea placeholder="有什么想和大家分享的？" :autosize="{ minRows: 3, maxRows: 3 }"/>
          <div class="icon-group">
            <i class="icon-dynamic_sc" title="上传图片"/>
            <i class="icon-dynamic_ht" title="参与话题"/>
            <i class="icon-dynamic_tp" title="发起投票"/>
            <i class="icon-dynamic_ds" title="定时发布"/>
            <a-button type="primary">发布</a-button>
          </div>
        </div>
        <div class="catalog">
          <a-tabs defaultActiveKey="2">
            <!-- <a-tab-pane tab="热门" key="1">
              <p>热门</p>
            </a-tab-pane> -->
            <a-tab-pane tab="全部" key="2">
              <total></total>
              <total></total>
            </a-tab-pane>
            <!-- <a-tab-pane tab="投稿视频" key="3">
              <p>123</p>
            </a-tab-pane>
            <a-tab-pane tab="追番" key="4">
              <p>123</p>
            </a-tab-pane>
            <a-tab-pane tab="小视频" key="5">
              <p>123</p>
            </a-tab-pane>
            <a-tab-pane tab="图片" key="6">
              <p>图片</p>
            </a-tab-pane>
            <a-tab-pane tab="专栏" key="7">
              <p>专栏</p>
            </a-tab-pane> -->
          </a-tabs>
        </div>
      </div>
      <div class="content-right">
        <div class="bulletin-board">
          <h4>公告栏</h4>
          <img src="@/assets/timg.jpg" alt="公共栏" title="有什么问题，快来反馈吧！">
        </div>
        <towntalk :towntalkData='popularTowntalkData'>热门话题</towntalk>
      </div>
    </div>
  </div>
</template>

<script>
import navMenu from '@/components/Public/navMenu'
import towntalk from './towntalk'
import total from './total'
import personalCard from './personalCard'
export default {
  name: 'Dynamic',
  components: {
    navMenu,
    towntalk,
    total,
    personalCard
  },
  data () {
    return {
      infoShow: false,
      userInfo: '',
      stateData: [
        {title: '关注', num: '9'},
        {title: '粉丝', num: '6'},
        {title: '动态', num: '12'}
      ],
      followTowntalkData: ['虚拟UP主', '这就是传说'],
      popularTowntalkData: ['执事帮帮忙', '新星计划', '打卡挑战', '2017到2019的对比', '弹幕之王', '我要变强大', '有趣的小日子', '听说这很强', '你真的喜欢现在的自己吗？']
    }
  },
  methods: {
    onInfoMouseEnter () {
      this.infoShow = true
    },
    onInfoMouseLeave () {
      this.infoShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.Dynamic {
  width: 100%;
  background-color: #9DC7F3;
}
.dynamic-content {
  width: 1144px;
  height: 1000px;
  padding-top: 10px;
  display: flex;
  position: relative;
  margin: 42px 20% 0px 20%;
  min-width: 1144px;
  & > div {
    & > div {
      background-color: white;
      border-radius: 5px;
    }
  }
}
@media screen and (max-width: 1600px){
  .dynamic-content {
    margin: 42px 10% 0px 10%;
  }
}
.content-left {
  width: 244px;
  .my-info {
    & > img {
      width: 100%;
      height: 80px;
    }
    .ant-avatar {
      position: relative;
      top: -32px;
      left: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    h4 {
      position: relative;
      left: 84px;
      top: -58px;
      &:hover {
        cursor: pointer;
        color: #00A1D6;
      }
    }
    .state {
      width: 80%;
      height: 40px;
      margin: 0 10%;
      display: flex;
      text-align: center;
      position: relative;
      top: -30px;
      .state_more {
        width: calc(100% / 3);
        cursor: pointer;
        & > p {
          color: #00A1D6;
          font-weight: 600;
        }
        & > h5 {
          &:hover {
            color: #00A1D6;
          }
        }
      }
    }
  }
}
.personalCard {
  position: absolute;
  top: 120px;
  left: 50px;
  z-index: 100;
}
.content-middle {
  width: 632px;
  margin-left: 20px;
  .share {
    width: 100%;
    height: 146px;
    padding: 10px;
    color: #222;
    textarea {
      background-color: #e5e9ef;
      &::placeholder {
        color: #222222;
      }
      &:hover {
        background-color: white;
      }
      &:focus {
        background-color: white;
      }
    }
    .icon-group {
      height: 50px;
      line-height: 50px;
      margin-top: 10px;
      & > i {
        margin: 0 8px;
        font-size: 25px;
        cursor: pointer;

        &:after {
          color: #00A1D6;
        }
      }
      .ant-btn {
        background-color: #FB7299;
        border-color: #FB7299;
        float: right;
      }
    }
  }
  .catalog {
    margin-top: 10px;
    background-color: #9DC7F3;

  }
}
.ant-tabs /deep/ .ant-tabs-nav {
  margin-left: 15px;
}
.ant-tabs /deep/ .ant-tabs-tab {
  margin: 0 12px 0 0;
}
.ant-tabs /deep/ .ant-tabs-bar {
  background-color: white;
  border-radius: 5px;
}
.ant-tabs /deep/ .ant-tabs-tabpane {
  background-color: white;
  border-radius: 5px;
  padding: 10px 25px;
}

.content-right {
  width: 268px;
  margin-left: 20px;
  .bulletin-board {
    height: 155px;
    padding: 0 15px;
    h4 {
      height: 39px;
      line-height: 39px;
    }
    img {
      height: 100px;
      width: 100%;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
