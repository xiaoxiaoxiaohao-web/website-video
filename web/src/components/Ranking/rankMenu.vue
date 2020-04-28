<template>
  <div class="rankMenu">
    <ul>
      <li v-for="(val, i) in menuData" :key="val + i" @click="onMenuClick(i)" ref="li">{{val}}</li>
      <!-- <div class="select">
        <a-select defaultValue="all" size="small" style="width: 100px" v-if="menuData.length === 9">
          <a-select-option value="all">全部投稿</a-select-option>
          <a-select-option value="near">近期投稿</a-select-option>
        </a-select>
        <a-select defaultValue="Tday" size="small" style="width: 100px">
          <a-select-option value="Tday">三日排行</a-select-option>
          <a-select-option value="day">日排行</a-select-option>
          <a-select-option value="week">周排行</a-select-option>
          <a-select-option value="month">月排行</a-select-option>
        </a-select>
      </div> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'rankMenu',
  props: ['menuData', 'num'],
  data () {
    return {
      // menuData: ['全站', '动画', '国创相关', '音乐', '舞蹈', '游戏', '科技', '数码', '生活']
    }
  },
  mounted () {
    // this.$refs.li[0].setAttribute('style', 'color:#00a1d6')
  },
  watch: {
    menuData: {
      immediate: true,
      handler (newVal) {
        console.log(newVal)
      }
    }
  },
  methods: {
    onMenuClick (e) {
      this.$refs.li.forEach((element, i) => {
        if (e === i) {
          this.$refs.li[i].setAttribute('style', 'color:#00a1d6')
          this.$emit('setLabel', this.$refs.li[i].innerHTML)
        } else {
          this.$refs.li[i].removeAttribute('style')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rankMenu {
  width: 100%;
  height: 40px;
  background-color: #edf2f9;
  margin-bottom: 10px;
  ul {
    // display: flex;
    list-style-type: none;
    line-height: 40px;
    height: 40px;
    li {
      float: left;
      margin:  0 12px;
      cursor: pointer;
      &:hover {
        color: #00a1d6;
      }
    }
    li:first-child {
      color: '#00a1d6';
    }
    .select {
      float: right;
      margin-right: 12px;
    }
  }
}
</style>
