<template>
  <div class="Footer">
    <div class="our-info">
      <div class="our">
        <h4>bilibili</h4>
        <div class="our-list">
          <p v-for="(val, i) in ourListData" :key="i"> {{val}}</p>
        </div>
      </div>
      <div class="portal">
        <h4>传送门</h4>
        <div class="portal-list">
          <p v-for="(val, i) in portalListData" :key="i"> {{val}}</p>
        </div>
      </div>
      <div class="download">
        <a-popover trigger="hover" v-for="(val, i) in iconGroupData" :key="i">
          <template slot="content">
            <img src="@/assets/wx-img.jpg" alt="二维码" width="100%" height="100%" />
          </template>
          <div class="icon-group">
            <i :class="val.icon"></i>
            <p>{{val.name}}</p>
          </div>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      ourListData: ['关于我们', '联系我们', '加入我们', '友情链接', '网站认证', 'Investor Relations'],
      portalListData: ['帮助中心', '高级弹幕', '活动专题页', '侵权申诉', '活动中心', '用户反馈论坛', '壁纸站', '名人堂', '专车号服务中心'],
      iconGroupData: [
        {icon: 'icon-footer_download', name: '客户端下载'},
        {icon: 'icon-footer_wb', name: '新浪微博'},
        {icon: 'icon-footer_wx', name: '官方微信'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.Footer {
  width: 100%;
  height: 350px;
  background-color: #f6f9fa;
  position: relative;
  bottom: 0;
}
.our-info {
  width: 1200px;
  height: 350px;
  margin: 0 auto;
  display: flex;

  & >  div {
    width: calc(100% / 3);
    margin-top: 30px;
    height: 120px;
    border-right: 1px solid #DDDDDD;
    margin-left: 10px;

    h4 {
      color: #99a2aa;
    }
  }
  & > div:last-child {
    border-right: 0;
  }
  .our-list, .portal-list {
    width: 100%;

    p {
      width: calc(100% / 3);
      float: left;
      color: #222;
      &:hover {
        color: #00a1d6;
      }
    }
  }
}
.download {
  padding-left: 20px;
  .icon-group {
    float: left;
    margin:  0 10px;
    text-align: center;

    &:hover {
      color: #00a1d6;
    }
    i {
      font-size: 55px;
    }
  }
}

</style>
