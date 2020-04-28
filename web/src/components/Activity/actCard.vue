<template>
  <div class="actCard">
    <img :src="'http://localhost:3001/activity/' + this.item.actSrc + '.jpg'" alt="活动">
    <div class="card-info">
      <h2>{{item.actName}}</h2>
      <div class="info-time">
        <span v-if="true">【进行中】</span>
        <span v-else>【已结束】</span>
        <span>{{item.startTime}} 至 {{item.endTime}}</span>
      </div>
      <p>{{item.actSign}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'actCard',
  props: ['item'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.actCard {
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #e5e9ef;
  display: flex;
  & > img {
    height: 150px;
    width: 260px;
    border-radius: 5px;
    margin-top: 25px;
    &:hover {
      cursor: pointer;
    }
  }
  .card-info {
    margin-left: 20px;
    margin-top: 25px;

    & > h2 {
      font-weight: 600;
      &:hover {
        cursor: pointer;
        color: #00a1d6;
      }
    }
    .info-time {
      height: 50px;
      line-height: 50px;
      color: #6d757a;
      font-weight: 600;
      span:first-child {
        color: #00a1d6;
      }
    }
  }
}
</style>
