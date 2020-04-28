<template>
  <div class="barrageList">
    <div class="barrage-header" @click="onOpenShrinkClick">
      <div>弹幕列表</div>
      <div class="open" v-if="openshrink">展开</div>
      <div class="shrink" v-else>收缩</div>
    </div>
    <!-- <div :class="[ [openshrink?'shrink-animation':'open-animation'], 'detail-list']" ref="list"> -->
    <div class="detail-list" ref="list">
      <a-table :columns="columns" :dataSource="danmuData" size="small" :scroll="{ y: 317 }" :pagination="false">
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'barrageList',
  props: ['vID'],
  data () {
    return {
      // listShow: false,
      openshrink: false,
      columns: [
        // {
        //   title: 'ID',
        //   dataIndex: 'id',
        //   key: 'id',
        //   width: 30
        // },
        {
          title: '弹幕内容',
          dataIndex: 'txt',
          key: 'txt',
          ellipsis: true
        },
        {
          title: '发送时间',
          dataIndex: 'time',
          key: 'time',
          width: 90
        }
      ],
      danmuData: [],
      openShrinkNum: 0 // 判断展开收缩
    }
  },
  watch: {
    vID: {
      immediate: true,
      handler (newVal) {
        if (newVal !== undefined) {
          this.setDanmuList(newVal)
        }
      }
    }
  },
  methods: {
    // 弹幕列表连接
    setDanmuList (id) {
      this.$API.use('list/danmuList', {vID: id}, this.getDamuListData)
    },
    // 获取弹幕数据
    getDamuListData (res) {
      res.data.forEach(element => {
        element.id = element.bID + ''
        element.time = this.$moment(element.sendtime).format('MM-DD HH:mm')
        this.danmuData.push(element)
      })
    },
    // 点击弹幕列表收缩展开按钮
    onOpenShrinkClick () {
      if (this.openShrinkNum === 0) {
        this.openshrink = !this.openshrink
        this.$refs.list.setAttribute('style', 'height: 0;')
        this.openShrinkNum = 1
      } else {
        this.openshrink = !this.openshrink
        this.$refs.list.setAttribute('style', 'height: 357.4px;')
        this.openShrinkNum = 0
      }
    }
  }
}
</script>

<style scoped>
.barrageList {
  margin-top: 26px;
  overflow-y: hidden;
}
.barrage-header {
  height: 46px;
  line-height: 46px;
  width: 100%;
  padding: 0 20px;
  background-color: #f4f4f4;
  color: #222;
  cursor: pointer;
  display: flex;
}
.open, .shrink {
  margin-left: auto;
}
/* .shrink-animation {
  animation: shrink 3s 1;
}
.open-animation {
  animation: open 3s 1;
} */
.detail-list {
 height: 357.4px;
}
/* 收缩动态效果 */
/* @keyframes shrink {
  from { height: 357.4px; }
  to {height: 0;}
}
/* 展开动态效果 */
/* @keyframes open {
  from { height: 0; }
  to {height: 357.4px;}
}  */
</style>
