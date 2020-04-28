<template>
  <div class="numCard">
    <p>{{title}}</p>
    <h1>0</h1>
  </div>
</template>

<script>
export default {
  name: 'numCard',
  props: ['title'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.numCard {
  width: calc(100% / 4 - 30px);
  background: rgba(0,161,214,.03);
  padding: 10px 30px;
  margin: 10px 15px 0 0;
  &:hover {
    cursor: pointer;
  }
  & > h1 {
    color: #00a1d6;
    height: 50px;
    line-height: 50px;
  }
  // & > p {
  //   height: 15px;
  // }
}
</style>
