<template>
  <div class="readCard">
    <div class="card-info">
      <h2>{{item.title}}</h2>
      <p>{{item.introduce}}</p>
      <div class="info">
        <img src="@/assets/timg.jpg" alt="头像">
        <span>{{item.author}}</span>
        <div class="span-group">
          <span>{{item.style}}</span>
          <span><i class="icon-iMenu_sy" />{{item.watchNum}}</span>
          <span><i class="icon-iMenu_sy" />{{item.praiseNum}}</span>
          <span><i class="icon-iMenu_sy" />{{item.messageNum}}</span>
        </div>
      </div>
    </div>
    <div class="card-img">
      <img src="@/assets/timg.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'readCard',
  props: ['item'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scopd>
.readCard {
  width: 100%;
  display: flex;
  height: 140px;
  padding: 20px 0;
  border-bottom: 1px solid #f4f5f7;
}
.card-info {
  width: calc(80% - 30px);
  margin-right: 30px;
  & > h2 {
    height: 31px;
    overflow: hidden;
  }
  p {
    height: 20px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info {
    width: 100%;
    height: 35px;
    line-height: 35px;
    display: flex;
    img {
      margin-top: 5px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    .span-group {
      & > span {
        margin: 0 20px;
      }
    }
  }
}
.card-img {
  width: 20%;

  img {
    width: 100%;
    height: 100%;
    // object-fit: cover;
    border-radius: 5px;
  }

}
</style>
