<template>
  <div class="infoMenu">
    <div class="menuLeft">
      <span v-for="(val, i) in menuData" :key="i" @click="onMenuData(val.path, i)" ref="span">
        <i :class="val.icon"/> {{val.title}}
      </span>
    </div>
    <div class="menuRight">
      <div v-for="(val, i) in numData" :key="i" class="menu-item">
        <h4>{{val.title}}</h4>
        <p>{{val.num}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infoMenu',
  data () {
    return {
      menuData: [
        {title: '主页', icon: 'icon-info_zy', path: ''}
      ],
      numData: [
        {title: '播放数', num: '0'},
        {title: '弹幕数', num: '0'},
        {title: '留言数', num: '0'}
      ]
    }
  },
  created () {
    this.setNumSum()
  },
  methods: {
    // 菜单选择
    onMenuData (v, i) {
      this.$router.push({path: v})
      this.$refs.span.forEach((element, n) => { // 样式变化
        if (i === n) {
          this.$refs.span[n].setAttribute('style', 'color:#00a1d6')
        } else {
          this.$refs.span[n].removeAttribute('style')
        }
      })
    },
    // 获取播放量，弹幕量，留言量接口
    setNumSum () {
      let username = this.$route.query.maker
      this.$API.use('sum/getNumSum', {attribute1: 'broadcast', attribute2: 'barrage', attribute3: 'message', username: username}, this.getNumSum)
    },
    // 获取播放量，弹幕量，留言量
    getNumSum (res) {
      if (res.state === '1') {
        let newObject = res.data[0]
        for (let i in newObject) {
          if (i.includes('1')) {
            this.numData[0].num = newObject[i]
          } else if (i.includes('2')) {
            this.numData[1].num = newObject[i]
          } else {
            this.numData[2].num = newObject[i]
          }
        }
      }
    }
  },
  mounted () {
    this.$refs.span[0].setAttribute('style', 'color:#00a1d6')
  }
}
</script>

<style lang="less" scoped>
.infoMenu {
  height: 66px;
  width: 1400px;
  margin:0 auto;
  display: flex;
  background: white;
}
.menuLeft  {
  width: calc(100% - 400px);
  height: 66px;
  line-height: 66px;
  span {
    font-size: 15px;
    margin: 0 10px;

    &:hover {
      cursor: pointer;
      color: #00a1d6;
    }
    i {
      font-size: 20px;
      padding: 0 3px;
    }
  }
}
.menuRight {
  width: 400px;
  display: flex;
  text-align: center;
  margin-top: 10px;
  .menu-item {
    width: 100px;
    &:hover {
      cursor: pointer;
      color: #00a1d6;
    }
  }
}
</style>
