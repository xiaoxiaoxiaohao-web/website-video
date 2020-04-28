<template>
  <div class="labelMap">
    <div class="label-card" ref="label" v-for="(val,index) in labelData" :key="index" :title="val">
      <div class="num">
        {{index + 1}}
      </div>
      <div class="label">
        <span>{{val}}</span>
      </div>
      <!-- <span>{{index + 1}}</span><span ref="span">{{val}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'labelMap',
  data () {
    return {
      labelData: ['影视', '娱乐', '影视剪辑', '生活', '明星', '搞笑', '日常', '综艺', '影视相关', 'koren相关']
    }
  },
  mounted () {
    // this.createLabelCard()
  },
  methods: {
    // 构造标签卡片
    // createLabelCard () {
    //   for (let i = 0; i < 10; i++) {
    //     // 获取随机数
    //     let num = Math.ceil((Math.random() + 1) * 60)
    //     let label = this.$refs.label[i]
    //     let attString = 'width:' + num + 'px; height:' + num + 'px; line-height:' + num + 'px;'
    //     if (label.innerText.length > 4) { // 超出部分省略
    //       attString = attString + 'white-space: nowrap; text-overflow: ellipsis; overflow: hidden;'
    //     }
    //     label.setAttribute('style', attString)
    //   }
    // }
    createLabelCard () {

    }
  }
}
</script>

<style lang="less" scoped>
.labelMap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.label-card {
  // background-color: #EF8CAD;
  // border-radius: 50%;
  // text-align: center;
  // margin: 20px 50px;
  // width: calc(100% / 5 - 20px);
  // height: 100px;
  // line-height: 100px;
  // margin: 20px 10px;
  // background-color: #EF8CAD;
  // cursor: pointer;
  // text-align: center;
  // & > span {
  //   color: white;
  // }
  height: 100px;
  line-height: 100px;
  margin: 20px 10px;
  display: flex;
  border: 1px solid gray;
  text-align: center;
  .num {
    width: 30px;
    background-color: white;
    font-weight: 600;
    font-size: 26px;
  }
  .label {
    width: 150px;
    background-color: #EF8CAD;
  }
}
</style>
