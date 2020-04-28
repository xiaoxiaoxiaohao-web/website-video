<template>
  <div id="app">
    <router-view/>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner"><a-icon type="up" /></div>
      </a-back-top>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
* {
  margin: 0 ;
  padding: 0;
}
h1, h2, h3, h4 ,h5, h6 {
  margin: 0;
}
img:hover {
  cursor: pointer;
}
/* .ant-popover /deep/ .ant-popover-inner-content {
  height: 150px;
  width: 200px;
  padding: 5px 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
} */
.ant-drawer /deep/ .ant-drawer-body {
  padding: 24px 0 ;
}
#components-back-top-demo-custom .ant-back-top {
    bottom: 100px;
  }
  #components-back-top-demo-custom .ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
</style>
