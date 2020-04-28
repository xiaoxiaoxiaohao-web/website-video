<template>
  <div class="topicCard">
    <img :src="require('@/assets/act/' + item.src)" alt="列表图">
    <div class="card-info">
      <h2>{{item.title}}</h2>
      <p>{{item.info}}</p>
      <div class="info-time">
        <span>{{item.exactTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topicCard',
  props: ['item'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.topicCard {
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #e5e9ef;
  display: flex;
  & > img {
    height: 160px;
    width: 125px;
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
    & > p {
      height: 50px;
      line-height: 50px;
    }
    .info-time {
      height: 50px;
      line-height: 50px;
      color: #6d757a;
      font-weight: 600;
    }
  }
}
</style>
