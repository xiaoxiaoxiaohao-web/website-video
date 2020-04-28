<template>
  <div class="readSelect">
    <a-select defaultValue="默认排序" @change="onHandleChange">
      <a-select-option v-for="(value, index) in selectData" :value="value.value" :key="index">{{value.value}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: 'readSelect',
  props: ['selectData'],
  data () {
    return {

    }
  },
  methods: {
    onHandleChange () {

    }
  }
}
</script>

<style lang="less" scoped>
    // .ant-select /deep/ .ant-select-selection {
    //   border: 1px solid white;
    // }
    // .ant-select /deep/ .ant-select-selection {
    //   border: 1px solid white;
    // }
    // .ant-select /deep/ .ant-select-focused {
    //   border: 1px solid white;
    // }

</style>
