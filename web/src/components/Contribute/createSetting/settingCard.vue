<template>
  <div class="settingCard">
    <div class="card-show">
      <div class="section-title">
        <slot name="title"></slot>
      </div>
      <div class="section-edit" @click="onDetailShowClick">
        <span v-if="detailShow">收起</span>
        <span v-else>编辑</span>
      </div>
    </div>
    <div class="watermark-wrp" v-show="detailShow">
      <slot name="watermark"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settingCard',
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    onDetailShowClick () {
      this.detailShow = !this.detailShow
    }
  }
}
</script>

<style lang="less" soped>
.settingCard {
  width: 860px;
  margin-top: 16px;
  padding: 19px;
  border: 1px solid #d9d9d9;
  .card-show {
    display: flex;
    .section-edit {
      margin-left: auto;
      // float: right;
      color: #00a1d6;
      cursor: pointer;
    }
  }
  .watermark-wrp {
    padding-top: 20px;
  }
}
</style>
