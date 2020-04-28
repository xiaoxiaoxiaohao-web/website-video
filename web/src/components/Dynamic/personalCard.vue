<template>
  <div class="personalCard">
    <img src="@/assets/timg.jpg" alt="背景图">
    <a-avatar :size="64" icon="user" />
    <h4>我还是输给你了<a-tag color="#00A1D6">LV3</a-tag></h4>
    <div class="info">
      <p><span>关注: 9</span> <span>粉丝: 6</span> </p>
      <p>谁认真谁就会输</p>
      <a-button type="primary"> <a-icon type="plus" />关注</a-button>
      <a-button>发消息</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personalCard',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.personalCard {
  width: 380px;
  height: 260px;
  background: white;
  border-radius: 5px;
  box-shadow: 1px 1px 3px gray;
  & > img {
    width: 100%;
    height: 120px;
    border-radius: 5px 5px 0 0;
  }
  .ant-avatar {
    position: relative;
    top: -32px;
    left: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  & > h4 {
    position: relative;
    left: 84px;
    top: -58px;
    &:hover {
      cursor: pointer;
      color: #00A1D6;
    }
  }
}
.info {
  position: relative;
  left: 84px;
  top: -55px;
}
.ant-btn-primary {
  margin-right: 20px;
}
.ant-btn {
  padding: 0 30px;
}
</style>
